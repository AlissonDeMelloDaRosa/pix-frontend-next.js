import {z} from 'zod';

export const loginSchema = z.object({
  cpf_cnpj: z
    .string()
    .min(11, 'CPF/CNPJ inválido')
    .regex(/^\d+$/, 'CPF/CNPJ deve conter apenas números'),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
