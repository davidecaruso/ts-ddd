import server from '../src/presentation/server'
import bootstrap from './bootstrap'

const app = bootstrap({
  components: { order: { mongodbUri: 'mongodb://foobar' } },
})
server(app)
