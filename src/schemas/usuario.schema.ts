import { z } from 'zod';

export const cadastroUsuarioSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  cpf_cnpj: z.string().regex(/^\d{11}$|^\d{14}$/, { message: "Formato de CPF/CNPJ inválido." }),
  senha: z.string().min(8, { message: "A senha precisa ter no mínimo 8 caracteres." }),
  confirmarSenha: z.string(),
})
.refine(data => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmarSenha"], 
});

export type CadastroUsuarioForm = z.infer<typeof cadastroUsuarioSchema>;