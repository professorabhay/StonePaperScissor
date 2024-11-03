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
  FormDescription,
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
import { Input } from "@/components/ui/input";
import { timeformat } from "@/lib/utils";
import { GameMove } from "@/types/types";
import useHasher from "@/hooks/useHasher";
import useSavedGames from "@/hooks/useSavedGames";

const formSchema = z.object({
  move: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "You need to select a your move.",
  }),
  password: z.string(),
});

export const P1Reveal: React.FC<{ GameAddress: `0x${string}` }> = ({
  GameAddress,
}) => {
  const { getMessageForSigning, signMessage } = useHasher();
  const addGame = useSavedGames((state) => state.addGame);
  const { writeP1Solve, gameMove, gameSalt, timeLeft } = useGame(GameAddress);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      move: gameMove?.toString() as "1" | "2" | "3" | "4" | "5" | undefined,
      password: gameSalt,
    },
  });

  async function saveGame(
    GameAddress: `0x${string}`,
    move: GameMove,
    salt: string
  ) {
    // writeP1Solve(move, password);
    const { message } = await getMessageForSigning(salt);
    const signature = await signMessage(message)
      .then((sign) => {
        addGame(GameAddress, move, sign!);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    gameSalt !== undefined
      ? writeP1Solve()
      : saveGame(
          GameAddress,
          values.move as unknown as GameMove,
          values.password
        );
    console.log(values);
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Card>
        <CardHeader>
          <CardTitle>Reveal Your Move</CardTitle>
          <CardDescription>
            Reveal your move and play against the opponent
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
                        disabled={gameMove !== undefined}
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Password </FormLabel>
                    <FormControl>
                      <Input
                        onChange={field.onChange}
                        disabled={gameSalt !== undefined}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      We use local storage of the browser to <br />
                      retrieve this secret. You can also add <br />
                      the password manually!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">
                  {gameSalt !== undefined ? "Reveal" : "Sign"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
