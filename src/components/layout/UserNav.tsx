
'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/auth/LoginModal'
import { RegisterModal } from '@/components/auth/RegisterModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@supabase/supabase-js'

export function UserNav() {
  const [user, setUser] = React.useState<User | null>(null)
  const [showLogin, setShowLogin] = React.useState(false)
  const [showRegister, setShowRegister] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const supabase = createClient()

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const toggleLanguage = () => {
    // Check current locale from cookie or default
    const currentLocale = document.cookie.match(/NEXT_LOCALE=([^;]+)/)?.[1] || 'en';
    const newLocale = currentLocale === 'en' ? 'zh' : 'en';
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  if (loading) {
    return <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full" />
  }

  return (
    <div className="flex items-center gap-4">
      {/* Language Switcher */}
      <Button variant="ghost" size="sm" onClick={toggleLanguage} className="hidden md:flex">
        EN/中文
      </Button>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata.avatar_url} alt={user.email || ''} />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.user_metadata.full_name || 'User'}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Pro Member
            </DropdownMenuItem>
            <DropdownMenuItem>
              Credits: 0
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => setShowLogin(true)} size="sm">
          Login
        </Button>
      )}

      <LoginModal 
        isOpen={showLogin} 
        onOpenChange={setShowLogin} 
        onSwitchToRegister={() => {
          setShowLogin(false)
          setShowRegister(true)
        }} 
      />
      <RegisterModal 
        isOpen={showRegister} 
        onOpenChange={setShowRegister} 
        onSwitchToLogin={() => {
          setShowRegister(false)
          setShowLogin(true)
        }} 
      />
    </div>
  )
}
