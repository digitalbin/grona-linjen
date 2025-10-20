import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main class="mx-auto p-4 text-center text-gray-700">
      <h1 class="max-6-xs my-16 text-6xl font-thin text-sky-700 uppercase">
        This is cool shop man! Check da products
      </h1>
      <A href="/products" class="text-sky-600 hover:underline">
        Products
      </A>
    </main>
  );
}
