import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getTitle, getUser, validateFields } from '../../utils';
import { drop, get, update, save } from '../../services';
import { useAppContext } from '../../contexts';
import {
  AppBarComponent,
  ButtonComponent,
  DiaperComponent,
  EatComponent,
  GridComponent,
  SleepComponent,
} from '../../components';

const Form: React.FC = () => {
  const { translate, showAlertMessage } = useAppContext();
  const navigate = useNavigate();

  const params = useParams();
  const actionType = params.type;
  const id = params.id;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const getForm = (actionType?: string) => {
    switch (actionType) {
      case '1':
        return (
          <SleepComponent data={data} setData={setData} translate={translate} />
        );
      case '2':
        return (
          <EatComponent data={data} setData={setData} translate={translate} />
        );
      case '3':
        return (
          <DiaperComponent
            data={data}
            setData={setData}
            translate={translate}
          />
        );
      default:
        return (
          <EatComponent data={data} setData={setData} translate={translate} />
        );
    }
  };

  const loadData = async (id: string) => {
    if (id) setData(get(id));
  };

  // const save = async () => {
  //   const d = JSON.parse(localStorage.getItem('items'));
  //   let dFinal = [];

  //   if (d) {
  //     dFinal = [...d, data];
  //   } else {
  //     dFinal = [data];
  //   }
  //   localStorage.setItem('items', JSON.stringify(dFinal));
  // };

  useEffect(() => {
    if (params && params.id) {
      loadData(params.id);
    }
  }, []);

  return (
    <>
      <AppBarComponent
        title={translate(getTitle(actionType))}
        id={id}
        _delete={() => {
          const _confirm = confirm('Deseja mesmo deletar este item?');
          if (_confirm) {
            drop(id);
            showAlertMessage('Item deletado com sucesso!!!', 'success');
            setTimeout(() => {
              navigate('/');
            }, 3000);
          } else {
            showAlertMessage('Ação cancelada', 'error');
          }
        }}
      />
      <GridComponent
        container={true}
        spacing={2}
        sx={{
          marginTop: '1em',
          padding: '1em',
          height: 'calc(100vh - 80px)',
        }}
      >
        <GridComponent item='true' size={{ xs: 12 }}>
          {getForm(actionType)}
          <ButtonComponent
            loading={loading.toString()}
            type='submit'
            fullWidth
            variant='contained'
            onClick={async () => {
              if (id) {
                update(data, id);
              } else {
                save(data);
              }
              // try {
              //   const fields = validateFields(data, actionType);
              //   if (fields.length === 0) {
              //     if (id) {
              //       await update('action_students', data, id);
              //     } else {
              //       data.user_id = getUser().id;
              //       // await save('action_students', data);
              //       save(data); /* localStorage */
              //     }
              //     showAlertMessage(
              //       `Item ${id ? 'editado' : 'criado'} com sucesso!!!`,
              //       'success'
              //     );
              //     setTimeout(() => {
              //       navigate('/');
              //     }, 3000);
              //   } else {
              //     showAlertMessage(
              //       `Os campos ${fields.join(', ')} são obrigatórios`,
              //       'warning'
              //     );
              //   }
              // } catch (err) {
              //   showAlertMessage(
              //     `Erro ao ${id ? 'editar' : 'criar'} item: ` + err,
              //     'error'
              //   );
              // }
            }}
            sx={{
              mt: 3,
              mb: 2,
              position: 'absolute',
              bottom: 0,
              left: 0,
              borderRadius: '0 !important',
              margin: 0,
            }}
          >
            {translate('save')}
          </ButtonComponent>
        </GridComponent>
      </GridComponent>
    </>
  );
};

export default Form;
