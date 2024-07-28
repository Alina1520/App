import { RestClProfileModule, RestHomeModule, RestJobModule } from "./_clients"
import { RestPhHomeModule, RestPhJobModule, RestPhProfileModule, RestServiceModule } from "./_photographers"
import { RestAuthModule } from "./auth"
import { RestOnBoardModule } from "./on-boarding"
import { RestSeedModule } from "./seed/seed.module"

export const getRestModules = ()=>[
    RestAuthModule.forRoot(),
    RestOnBoardModule.forRoot(),
    RestPhProfileModule.forRoot(),
    RestJobModule.forRoot(),
    RestHomeModule.forRoot(),
    RestClProfileModule.forRoot(),
    RestPhJobModule.forRoot(),
    RestSeedModule.forRoot(),
    RestPhHomeModule.forRoot(),
    RestServiceModule.forRoot()
]
