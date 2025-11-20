import { z } from 'zod';

export const transacaoSchema = z.object({
  chaveDestino: z.string().min(1, { message: "A chave de destino é obrigatória." }),
  valor: z.coerce.number()
          .positive({ message: "O valor da transação deve ser maior que zero." }),
  
  mensagem: z.string().optional(),
});

export type TransacaoForm = z.infer<typeof transacaoSchema>;