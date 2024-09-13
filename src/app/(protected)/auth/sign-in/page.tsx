'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, LockIcon, MailIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { signInAction } from '@/lib/actions/auth'

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [state, formAction, pending] = useActionState(signInAction, undefined)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                    <CardDescription className="text-center">
                        Ingresa a tu cuenta de inversiones
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={formAction}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="juan@ejemplo.com"
                                    required
                                    className={`pl-10 ${state?.errors?.email ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {state?.errors && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className={`pl-10 pr-10 ${state?.errors?.password ? 'border-red-500' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {state?.errors?.password && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
                            )}
                        </div>
                        {state?.success && (
                            <div className="flex items-center space-x-2 text-red-600 mt-2">
                                <AlertCircle size={20} />
                                <span>{state.message}</span>
                            </div>
                        )}
                        <Button
                            type="submit"
                            aria-disabled={pending}
                            className="w-full mt-6 bg-green-600 hover:bg-green-700"
                        >
                            {pending ? 'Iniciando Sesión' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                </CardContent>
                {state?.success && (
                    <div className="flex items-center justify-center space-x-2 text-green-600 mt-4">
                        <CheckCircle2 size={20} />
                        <span>{state.message}</span>
                    </div>
                )}
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 mt-2 w-full">
                        ¿No tienes una cuenta?{' '}
                        <a href="/signup" className="text-green-600 hover:underline">
                            Regístrate
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}