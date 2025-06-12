import { product } from "./product"
import { collection } from "./collection"
import category from "./category"
import { page } from "./page"
import { siteSettings } from "./siteSettings"
import { restockNotification } from "./restockNotification"
import { partner } from "./partner"
import { telegramOrder } from "./telegramOrder"
import productVariant from "./productVariant"

export const schemaTypes = [product, collection, category, page, siteSettings, restockNotification, partner, telegramOrder, productVariant] 