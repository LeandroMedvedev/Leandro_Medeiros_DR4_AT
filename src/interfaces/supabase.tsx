import { PostgrestSingleResponse } from '@supabase/supabase-js';

interface SupabaseCondition {
  field: string;
  value: string | number | boolean;
}

interface ISupabaseService {
  /**
   * Atualiza ou insere dados em uma tabela específica.
   * @param table Nome da tabela.
   * @param data Dados a serem inseridos ou atualizados.
   * @param id (Opcional) ID do registro a ser atualizado.
   * @returns Promessa contendo os dados atualizados ou inseridos.
   */
  update<T extends { id?: string | number }>(
    table: string,
    data: Partial<T>,
    id: string | number | null
  ): Promise<PostgrestSingleResponse<T[]>>;

  /**
   * Remove um registro de uma tabela específica.
   * @param table Nome da tabela.
   * @param id ID do registro a ser removido.
   * @returns Promessa contendo a confirmação da exclusão.
   */
  drop(
    table: string,
    id?: string | number
  ): Promise<PostgrestSingleResponse<null>>;

  /**
   * Busca um registro em uma tabela com base em condições.
   * @param table Nome da tabela.
   * @param id ID do registro a ser obtido.
   * @param conditions Array de condições para a consulta.
   * @returns Promessa contendo o primeiro registro encontrado.
   */
  // get<T>(table?: string, conditions?: SupabaseCondition[]): Promise<T | null>;
  get<T>(table: string, id: string): Promise<T | null>;

  /**
   * Lista todos os registros de uma tabela para o usuário atual.
   * @param table Nome da tabela.
   * @returns Promessa contendo a lista de registros.
   */
  list<T>(table: string): Promise<T[]>;

  /**
   * Salva dados em uma tabela (inserção ou atualização automática).
   * @param table Nome da tabela.
   * @param data Dados a serem salvos.
   */
  save<T>(table: string, data: Partial<T>): Promise<void>;
}

export default ISupabaseService;
