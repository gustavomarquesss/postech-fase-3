import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from './Modal';
import { Loading } from './Loading';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Nome de usuário é obrigatório')
    .min(3, 'Nome de usuário deve ter pelo menos 3 caracteres')
    .max(50, 'Nome de usuário deve ter no máximo 50 caracteres'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
      success('Login realizado com sucesso!');

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      console.error('Erro no login:', err);
      error(
        err instanceof Error
          ? err.message
          : 'Erro ao fazer login. Verifique suas credenciais.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      reset();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Login"
      size="sm"
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Nome de Usuário
          </label>
          <input
            {...register('username')}
            type="text"
            id="username"
            className={`input-field ${errors.username ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Digite seu nome de usuário"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Digite sua senha"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loading size="sm" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
