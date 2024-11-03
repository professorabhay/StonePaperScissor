"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
//import useSoundPool from "@/hooks/useSoundPool";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useHasher from "@/hooks/useHasher";
import useCreateGame from "@/hooks/useCreateGame";
import { GameMove } from "@/types/types";
import { keccak256, isAddress } from "viem";

const formSchema = z.object({
  BetAmount: z
    .string()
    .regex(/^(0|[1-9]\d*)\.?\d*$/)
    .refine((value) => parseInt(value) >= 0, {
      message: "Must be 0 and above",
    }),
  OpponentAddress: z
    .string()
    .refine((value) => isAddress(value), { message: "Invalid Address" }),
  move: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "You need to select a your move.",
  }),
});

export default function Dashboard() {
  //const { clickSound } = useSoundPool();
  const { getMessageForSigning, signMessage } = useHasher();
  const { createGame } = useCreateGame();
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      OpponentAddress: "",
      BetAmount: "0",
      move: "1",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //clickSound();
    const signature = await signMessage(message)
      .then((sign) => {
        createGame(
          values.OpponentAddress as `0x${string}`,
          values.BetAmount,
          values.move as unknown as GameMove,
          keccak256(sign!)
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    const { message, password } = getMessageForSigning();
    setMessage(message);
    setPassword(password);
    console.log("pass", password);
  }, []);

  return (
    <div className="">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Create</TabsTrigger>
          <TabsTrigger value="password">Join</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Create New Game</CardTitle>
              <CardDescription>
                This game uses a commit-reveal scheme for player 1 to commit to
                his move without revealing it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="OpponentAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opponent Address</FormLabel>
                        <FormControl>
                          <Input placeholder="0xd914......39138" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="BetAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bet Amount (in eth)</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="move"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Choose Your Move</FormLabel>
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
                              <FormLabel className="font-normal">
                                Rock
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem src="/paper.png" value="2" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Paper
                              </FormLabel>
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
                              <FormLabel className="font-normal">
                                Spock
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex flex-col items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem src="/lizard.png" value="5" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Lizard
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Your Password Is </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        disabled={true}
                        value={password}
                      />
                    </FormControl>
                    <FormDescription>
                      Although, We use local storage of the browser to keep this
                      secret. You can also save the password elsewhere! so that
                      you can generate the signature in case of emergency!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>

                  <Button type="submit">Create Game</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Join Game</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Game Contract Address</Label>
                <Input id="current" placeholder="0xd914......39138" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Join</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
