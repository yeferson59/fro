'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, LockIcon, MailIcon, UserIcon, UserPlusIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { signUp } from '@/lib/actions/auth'

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [state, formAction, pending] = useActionState(signUp, undefined)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
                    <CardDescription className="text-center">
                        Regístrate para comenzar tu viaje de inversión
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={formAction}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Juan"
                                        required
                                        className={`pl-10 ${state?.errors?.name ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {state?.errors?.name && (
                                    <p className="text-red-500 text-sm mt-1">{state?.errors.name}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Apellido</Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Pérez"
                                        required
                                        className={`pl-10 ${state?.errors?.lastName ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {state?.errors?.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{state.errors.lastName}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label htmlFor="user">Nombre de Usuario</Label>
                            <div className="relative">
                                <UserPlusIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="user"
                                    name="username"
                                    type="text"
                                    placeholder="juanperez123"
                                    required
                                    className={`pl-10 ${state?.errors?.username ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {state?.errors?.username && (
                                <p className="text-red-500 text-sm mt-1">{state?.errors.username}</p>
                            )}
                        </div>
                        <div className="space-y-2 mt-4">
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
                            {state?.errors?.email && (
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
                        <Button
                            type="submit"
                            aria-disabled={pending}
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                        >
                            Crear Cuenta
                        </Button>
                    </form>
                </CardContent>
                {state?.success && (
                    <div className="flex items-center justify-center space-x-2 text-green-600 mt-4">
                        <CheckCircle2 size={20} />
                        <span>{state?.message}</span>
                    </div>
                )}
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 mt-2 w-full">
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/signin" className="text-blue-600 hover:underline">
                            Inicia Sesión
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}