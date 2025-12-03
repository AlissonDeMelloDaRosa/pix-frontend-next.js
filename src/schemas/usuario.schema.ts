import {z} from 'zod';

export const usuarioSchema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(255, 'Nome muito longo'),
  cpf_cnpj: z
    .string()
    .min(11, 'CPF/CNPJ inválido')
    .max(14, 'CPF/CNPJ inválido')
    .regex(/^\d+$/, 'CPF/CNPJ deve conter apenas números'),
  numero_conta: z
    .string()
    .min(1, 'Número da conta é obrigatório')
    .max(20, 'Número da conta muito longo'),
  senha: z
    .string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(100, 'Senha muito longa'),
});

export type UsuarioFormData = z.infer<typeof usuarioSchema>;