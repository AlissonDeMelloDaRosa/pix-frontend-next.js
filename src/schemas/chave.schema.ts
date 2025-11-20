import { z } from 'zod';

const tiposDeChave = ['CPF/CNPJ', 'Email', 'Telefone', 'Aleatória'] as const;

export const cadastroChaveSchema = z.object({
  tipo: z.enum(tiposDeChave, { message: "Selecione um tipo de chave." }),
  chave: z.string().min(1, { message: "O valor da chave é obrigatório." }),
})
.refine(data => {
    if (data.tipo === 'Email') {
      return z.string().email().safeParse(data.chave).success;
    }
    return true;
  }, {
    message: "O formato do email é inválido.",
    path: ['chave'],
  });

export type CadastroChaveForm = z.infer<typeof cadastroChaveSchema>;