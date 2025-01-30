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
  // const [nthPrime, setNthPrime] = useState();




  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numInput: undefined,
    },
  })



  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);


    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // getNthPrime(values.numInput);
      console.log(nthPrime);
      console.log("Form Submitted:", values);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }


    // try {
    //   // Make API call or perform your submission logic
      // const nthPrime = await getNthPrime(values.numInput);
      // console.log(nthPrime);
    // } catch (error) {
    //   // Handle any errors 
    // } finally {
    //   setIsLoading(false);
    //   console.log('set Loading false')

    // }



    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
    
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
          <Button type="submit">
            {isLoading && <Loader2 className="animate-spin" />}
            Submit
          </Button>
          <h3 className="text-primary">{isLoading.toString()}</h3>

        </form>
      </Form>


    </div>

  )
}
