import React, { useState, useEffect } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getNthPrime } from "../Sieve/sieve"
import { Loader2 } from "lucide-react"



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
    console.log('clear form');
    form.reset();
    setNthPrime(undefined);
  }


  return (
    <div className='w-full flex items-center justify-center'>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="numInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nth Prime</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="choose a number" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>
                  Get the Nth Prime Number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between w-full'>
            <Button type="submit">
              {isLoading && <Loader2 className="animate-spin" />}
              Submit
            </Button>

            <Button type="button" onClick={clearForm}>
              Clear
            </Button>
          </div>

          <h3 className="text-primary">{nthPrime?.toString()} </h3>

        </form>
      </Form>


    </div>

  )
}
