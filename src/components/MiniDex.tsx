import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import usePokemonDetails from '@/hooks/usePokemonDetails';

interface InnerRecord {
  name: string;
  url: string;
}

interface PokemonAPIResponse {
  name: string;
  generation: InnerRecord;
  is_legendary: boolean;
  is_mythical: boolean;
  color: InnerRecord;
}

type DexProps = React.ComponentProps<typeof Card>;
type MiniDexProps = {
  pokemonSpecies?: PokemonAPIResponse;
};

export default function MiniDex({ pokemonSpecies }: MiniDexProps) {
  const pokemonName = pokemonSpecies?.name ?? '';
  const {
    pokemonDetails,
    loading: detailsLoading,
    error: detailsError,
  } = usePokemonDetails(pokemonName, true);
  const sprite = pokemonDetails?.sprites?.front_default ?? '';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      {true ? <LoadingComponent sprite={sprite} /> : <Dex />}
    </main>
  );
}

function LoadingComponent({ sprite }) {
  return (
    <Card className="w-full md:w-6/12 p-5 border-none">
      <div className="loading-dex flex flex-col gap-4 items-center">
        <div className="flex items-center justify-start ">
          <Skeleton className="h-20 w-20 mb-5 rounded-full" />
        </div>
        <Avatar className="h-40 w-40">
          <AvatarImage src={sprite} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Skeleton className="h-20 w-2/3 rounded-xl" />
        <Skeleton className="h-4 w-2/3 rounded-xl" />
        <Skeleton className="h-4 w-2/3 rounded-xl" />
      </div>
    </Card>
  );
}

function Dex({ className, ...props }: DexProps) {
  return (
    <Card className={cn('w-full md:w-6/12 p-5', className)} {...props}>
      <div className="flex items-center justify-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <CardHeader>
        <CardTitle>Pokemon name</CardTitle>
        <CardDescription>Put the avatar and pokemon name</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          Poke main details
        </div>
        <div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Hello</p>
              <p className="text-sm text-muted-foreground">Description</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  );
}
