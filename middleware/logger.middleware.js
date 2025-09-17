import { loggerService } from '../services/logger.service.js'

export async function log(req, res, next) {
    const { baseUrl, method, body, params } = req
	loggerService.info(baseUrl, method, body, params)
	next()
}
