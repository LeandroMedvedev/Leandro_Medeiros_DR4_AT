interface Item {
  id: string;
  [ key: string ]: any;
}

const generateUuid = () => {
  return 'uuid-' + Math.random().toString(36).substr(2, 18);
}

const update = (data: Partial<Item>, id: string) => {
  const totalData = list();
  const index = totalData.findIndex((item: any) => item.id === id);
  totalData[ index ] = data;

  updateStorage(totalData);
}

const drop = (id?: string) => {
  const totalData = list();
  const index = totalData.findIndex((item: any) => item.id === id);
  totalData.splice(index, 1)

  updateStorage(totalData);
}

const get = (id: string) => {
  const totalData = list();

  return totalData.find((item: any) => item.id === id);
}

const list = () => {
  const data = localStorage.getItem("items");
  if (data) {
    return JSON.parse(data)
  }
  return [];
}

const save = (data: Omit<Item, 'id'>) => {
  const totalData = list();

  const d = {
    id: generateUuid(),
    ...data
  }

  totalData.push(d);
  updateStorage(totalData);
}

const updateStorage = (data: Item[]) => {
  localStorage.setItem("items", JSON.stringify(data));
}

export {
  save,
  update,
  drop,
  get,
  list,
}