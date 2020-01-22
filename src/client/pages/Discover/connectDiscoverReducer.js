/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import ConnectCompReducer from "../../../utils/connectPageReducer"
import { awaitWrapper } from "../../../utils"
import { ADD_BANNER_LIST } from "./constants"

class ConnectDiscoverReducer extends ConnectCompReducer {
  requestBannerList = url => {
    return this.fetcher
      .get(url)
      .then(res => res.data.banners)
      .then(banners =>
        banners.map(banner => ({
          pic: banner.pic,
          typeTitle: banner.typeTitle,
        })),
      )
  }

  requestSearchSuggest = url => {
    return this.fetcher.get(url).then(res => res.data.result)
  }

  requestSearchBestMatch = async url => {
    const result = await this.fetcher.get(url).then(res => res.data.result)
    if (result) {
      if (result.orders?.length) {
        const type = result.orders[0]
        return { data: result[type], type }
      }
    }
  }

  requestSearch = async url => {
    return this.fetcher.get(url).then(res => res.data.result)
  }

  getInitialData = async store => {
    const [error, bannerList] = await awaitWrapper(this.requestBannerList)(
      "/api/banner?type=2",
    )

    if (error) {
      //  handle error in server setInitialDataToStore
      return Promise.reject(error)
    }
    store.dispatch({
      type: ADD_BANNER_LIST,
      data: bannerList,
    })
  }
}

export default new ConnectDiscoverReducer()
