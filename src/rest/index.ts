import { RestJobModule } from "./clients"
import { RestProfileModule } from "./photographers"
import { RestAuthModule, RestUserInfoModule } from "./users"

export const getRestModules = ()=>[
    RestAuthModule.forRoot(),
    RestUserInfoModule.forRoot(),
    RestProfileModule.forRoot(),
    RestJobModule.forRoot()
]
