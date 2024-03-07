import { RestAuthModule, RestUserInfoModule } from "./users"

export const getRestModules = ()=>[
    RestAuthModule.forRoot(),
    RestUserInfoModule.forRoot()
]
