import { z } from 'zod';

export const transacaoSchema = z.object({
  valor: z
    .number({ invalid_type_error: 'Valor deve ser um número' })
    .positive('Valor deve ser positivo')
    .min(0.01, 'Valor mínimo é R$ 0,01'),
  chavePixDestino: z
    .string()
    .min(1, 'Chave PIX de destino é obrigatória')
    .max(255, 'Chave PIX muito longa'),
  descricao: z
    .string()
    .max(255, 'Descrição muito longa')
    .optional(),
});

export type TransacaoFormData = z.infer<typeof transacaoSchema>;
