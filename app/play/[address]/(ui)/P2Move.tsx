"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useGame from "@/hooks/useGames";
import { timeformat } from "@/lib/utils";

const formSchema = z.object({
  move: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "You need to select a your move.",
  }),
});

export const P2Move: React.FC<{ GameAddress: `0x${string}` }> = ({
  GameAddress,
}) => {
  const { writeP2Play, timeLeft } = useGame(GameAddress);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      move: "1",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    writeP2Play(Number(values.move));
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Move</CardTitle>
          <CardDescription>
            Choose your move and play against the player 1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
        <strong>Time Left : {timeformat(timeLeft)}</strong>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="move"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3  space-y-1"
                      >
                        <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem src="/rock.png" value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">Rock</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem src="/paper.png" value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">Paper</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem src="/scissors.png" value="3" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Scissors
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem src="/spock.png" value="4" />
                          </FormControl>
                          <FormLabel className="font-normal">Spock</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem src="/lizard.png" value="5" />
                          </FormControl>
                          <FormLabel className="font-normal">Lizard</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Play</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
