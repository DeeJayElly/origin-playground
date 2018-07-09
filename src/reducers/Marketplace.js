import { MarketplaceConstants } from 'actions/Marketplace'

const initialState = {
  contractAddress: null,
  arbitratorAddress: null,
  arbitratorGas: undefined,
  arbitrator: null,
  createListingResponse: undefined,
  createListingGas: undefined,
  updateListingResponse: undefined,
  updateListingGas: undefined,
  makeOfferResponse: undefined,
  makeOfferGas: undefined,
  acceptOfferGas: undefined,
  finalizeOfferGas: undefined,
  listings: [],
  offers: [],

  eventsResponse: undefined,
  events: []
}

if (window.localStorage.marketplaceContract) {
  initialState.contractAddress = window.localStorage.marketplaceContract
}
if (window.localStorage.arbitratorContract) {
  initialState.arbitratorAddress = window.localStorage.arbitratorContract
}

export default function Token(state = initialState, action = {}) {
  switch (action.type) {
    case MarketplaceConstants.DEPLOY_RECEIPT:
      return { ...state, deployMarketplaceGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_SUCCESS:
      window.localStorage.marketplaceContract = action.receipt._address
      return { ...state, contractAddress: action.receipt._address }

    case MarketplaceConstants.DEPLOY_ARBITRATOR_RECEIPT:
      return { ...state, deployArbitratorGas: action.receipt.gasUsed }

    case MarketplaceConstants.DEPLOY_ARBITRATOR_SUCCESS:
      window.localStorage.arbitratorContract = action.receipt._address
      return {
        ...state,
        arbitratorAddress: action.receipt._address
      }

    case MarketplaceConstants.CREATE_LISTING:
      return { ...state, createListingResponse: 'submitted' }

    case MarketplaceConstants.CREATE_LISTING_HASH:
      return { ...state, createListingResponse: 'in-pool' }

    case MarketplaceConstants.CREATE_LISTING_RECEIPT:
      return { ...state, createListingResponse: 'success', createListingGas: action.receipt.gasUsed }

    case MarketplaceConstants.UPDATE_LISTING:
      return { ...state, updateListingResponse: 'submitted' }

    case MarketplaceConstants.UPDATE_LISTING_HASH:
      return { ...state, updateListingResponse: 'in-pool' }

    case MarketplaceConstants.UPDATE_LISTING_RECEIPT:
      return { ...state, updateListingResponse: 'success', updateListingGas: action.receipt.gasUsed }

    case MarketplaceConstants.MAKE_OFFER:
      return { ...state, makeOfferResponse: 'submitted' }

    case MarketplaceConstants.MAKE_OFFER_HASH:
      return { ...state, makeOfferResponse: 'in-pool' }

    case MarketplaceConstants.MAKE_OFFER_RECEIPT:
      return { ...state, makeOfferResponse: 'success', makeOfferGas: action.receipt.gasUsed }

    case MarketplaceConstants.ACCEPT_OFFER_RECEIPT:
      return { ...state, makeOfferResponse: 'success', acceptOfferGas: action.receipt.gasUsed }

    case MarketplaceConstants.FINALIZE_OFFER_RECEIPT:
      return { ...state, makeOfferResponse: 'success', finalizeOfferGas: action.receipt.gasUsed }

    case MarketplaceConstants.GET_ALL_LISTINGS_SUCCESS:
      return { ...state, listings: action.listings }

    case MarketplaceConstants.GET_OFFERS_SUCCESS:
      return { ...state, offers: action.offers }

    case MarketplaceConstants.GET_EVENTS:
      return { ...state, eventsResponse: null }

    case MarketplaceConstants.GET_EVENTS_SUCCESS:
      return { ...state, events: action.events, eventsResponse: 200 }

    case MarketplaceConstants.GET_ARBITRATOR_SUCCESS:
      return { ...state, arbitrator: action.arbitrator }

  }

  return state
}