/* Métodos deste arquivo utilizados para armazenamento no Supabase */
import { createClient } from '@supabase/supabase-js';

import { ISupabaseService } from '../interfaces';
import { getUser } from '../utils';


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
// const table_name = 'action_students';
const user = getUser();

// const update: ISupabaseService[ 'update' ] = async (table, data, id) => {
//   if (id) {
//     data.id = id;
//   }
//   return await supabase.from(table).upsert(data).select()
// }
const update: ISupabaseService[ 'update' ] = async (table, data, id) => {
  if (id) {
    data.id = id;
  }

  return await supabase.from(table).upsert(data).select();
}


// const drop: ISupabaseService[ 'drop' ] = async (table, id) => {
//   return await supabase.from(table).delete().eq("id", id);
// }
const drop: ISupabaseService[ 'drop' ] = async (table, id) => {
  return await supabase.from(table).delete().eq("id", id);
}

// const get: ISupabaseService[ 'get' ] = async (table, conditions) => {
//   let query = supabase.from(table).select()

//   if (conditions && conditions.length > 0) {
//     for (let condition of conditions) {
//       query = query.eq(condition.field, condition.value)
//     }
//   }

//   const { data, error } = await query.order('created_at', { ascending: false });

//   if (error) {
//     throw error;
//   }
//   return data[ 0 ];
// }
const get: ISupabaseService[ 'get' ] = async (table, id) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq('id', id)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }

  return data[ 0 ];
}

// const list: ISupabaseService[ 'list' ] = async (table) => {
//   const { data, error } = await supabase.from(table).select().eq("user_id", user.id).order('created_at', { ascending: false });
//   if (error) {
//     throw error;
//   }
//   return data;
// }
const list: ISupabaseService[ 'list' ] = async (table) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
}

// const save: ISupabaseService[ 'save' ] = async (table, data) => {
//   update(table, data, null)
// }
const save: ISupabaseService[ 'save' ] = async (table, data) => {
  update(table, data, null)
}

export {
  save,
  update,
  drop,
  get,
  list,
};