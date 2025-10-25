export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer class="bg-glb-black p-4 text-center text-white">
      <p>
        ® {year} Gröna Linjen Bryggeri x{" "}
        <a target="_blank" href="https://digitalb.in" class="underline">
          digitalbin ab
        </a>
      </p>
    </footer>
  );
}
