import { Component, Vue } from 'vue-property-decorator'
import Http from '@/utils/http'

@Component
export default class About extends Vue {

  private test = 'wefwe'

  private mounted () {
    console.log(this.test)
    this.getData()
  }

  private async getData () {
    console.log('get data')
    const result = await Http.get('/api/lottery/types', {
      key: 'd1f0be1962b53cbd89343e89eecc6c9'
    })
    console.log(result)
  }

  protected render () {
    return <div>this is about</div>
  }
}
