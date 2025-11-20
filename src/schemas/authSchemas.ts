import { z } from 'zod';

export const registrationSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  cpf_cnpj: z.string().regex(/^\d{11}$|^\d{14}$/, { message: "Formato de CPF/CNPJ inválido." }),
  numero_conta: z.string().min(1, { message: "O número da conta é obrigatório." }),
  senha: z.string().min(8, { message: "A senha precisa ter no mínimo 8 caracteres." }),
});

export type RegistrationForm = z.infer<typeof registrationSchema>;