import { defineConfig } from '@wagmi/cli'
import { react, actions } from "@wagmi/cli/plugins";

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [react(), actions()],
})
