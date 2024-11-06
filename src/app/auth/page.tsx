"use client"
import { FormEvent, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../_components/ui/tabs'
import { Card, CardContent, CardDescription, CardTitle } from '../_components/ui/card'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../_components/ui/form';
import { Input } from '../_components/ui/input';
import { Button } from '../_components/ui/button'
import axios from "axios"

export default function LoginPage() {
  const [session, setSession] = useState(null);

  return (
    <main className='my-auto'>
      <Tabs defaultValue='signin'>
        <TabsList>
          <TabsTrigger value='signin'>Sign In</TabsTrigger>
          <TabsTrigger value='signup'>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value='signin'>
          <SigninForm />
        </TabsContent>
        <TabsContent value='signup'>
          <SignupForm />
        </TabsContent>

      </Tabs>
    </main>
  )
}


function SigninForm() {
  const loginForm = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  async function handleSubmit(data: {username: string, password: string}) {
    axios.post('/api/auth/login', data)
  }


  return(<Card>
    <CardTitle className='mt-4'>Sign In</CardTitle>

    <CardContent className='space-y-2'>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleSubmit)}>
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} inputMode='email' />
                </FormControl>
                <FormDescription>Enter your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-5'>Sign In</Button>
        </form>

      </Form>
    </CardContent>

  </Card>)
}

function SignupForm() {
  const loginForm = useForm({
    defaultValues: {
      username: '',
      password: '',
      repeatedPassword: ''
    }
  });
  async function handleSubmit(data: {username: string, password: string, repeatedPassword: string}) {
    axios.post('/api/auth/signup', data)

  }


  return(
    <Card>
    <CardTitle className='mt-4'>Sign up</CardTitle>

    <CardContent className='space-y-2'>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleSubmit)}>
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' inputMode="email" />
                </FormControl>
                <FormDescription>Enter your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="repeatedPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-5'>Sign In</Button>
        </form>

      </Form>
    </CardContent>

  </Card>
  )
}


