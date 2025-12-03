import { z } from 'zod';
export const chavePixSchema = z.object({
  tipo: z.enum(['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'ALEATORIA'], {
    errorMap: () => ({ message: 'Selecione um tipo de chave válido' }),
  }),
  valor: z.string().min(1, 'Valor da chave é obrigatório'),
});

export type ChavePixFormData = z.infer<typeof chavePixSchema>;
