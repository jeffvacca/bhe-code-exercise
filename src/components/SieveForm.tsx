import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getNthPrime } from "../Sieve/sieve"
import { Loader2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const formSchema = z.object({
  numInput: z.coerce.number().nonnegative({
    message: "Must be a non-negative number",
  }),
})


export default function SieveForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [nthPrime, setNthPrime] = useState<number>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numInput: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const nthPrime = await getNthPrime(values.numInput);
      setNthPrime(nthPrime);

    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const clearForm = () => {
    form.reset();
    setNthPrime(undefined);
  }

  return (
    <div className='md:grid grid-cols-1 md:grid-cols-2 py-8 gap-16'>
      <Card className="!bg-transparent !border-slate-300 !text-slate-800 mb-8">
        <CardHeader>
          <CardTitle>Nth Prime</CardTitle>
          <CardDescription>Get the Nth Prime Number</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="numInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl text-slate-800 !mb2 block"></FormLabel>
                    <FormControl>
                      <Input className="!border-slate-400" type="number" placeholder="choose a number" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center'>
                <Button type="submit" variant='outline' className="mr-4 !bg-transparent !border-slate-400 dark:hover:text-slate-400" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />}
                  Submit
                </Button>
                <Button type="button" variant="outline" className='!bg-transparent !border-slate-400 dark:hover:text-slate-400' onClick={clearForm}>
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className='!bg-transparent !border-slate-300 !text-slate-800 mb-8'>
        <CardHeader>
          <CardTitle>Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-4xl font-mono text-slate-500">{nthPrime?.toString()} </h3>
        </CardContent>
      </Card>
    </div>
  )
}
