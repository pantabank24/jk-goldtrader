export interface PriceDto {
    gold965: Gold965
    timestamp: string
  }

export interface Gold965 {
    bid: number
    ask: number
    diff: any
    change_today: number
    change_yesterday: number
  }