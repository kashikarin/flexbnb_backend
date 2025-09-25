import { loggerService } from "../services/logger.service.js"

function hasKey(obj, path) {
  const parts = path.split('.')
  let current = obj

  for (const part of parts) {
    if (!current || !Object.prototype.hasOwnProperty.call(current, part)) {
      return false
    }
    current = current[part]
  }
  return true
}

export function requireParams({
    keys = [], 
    errorMessage = '', 
    statusCode = 400}) {
    
    return (req, res, next) => {
        let source
        if (req.method === 'GET') source = 'query'
        else source = 'body'
        
        if (!Array.isArray(keys) || keys.length === 0) {
            loggerService.error("No keys provided for validation")
            return res.status(500).send('Internal Server Error: No keys provided for validation')
        }
        
        const missingKeys = keys.filter((key) => !hasKey(req[source], key))

        if (missingKeys.length > 0) {
            const pathName = req.originalUrl || 'Unknown Path'
            const user = req.loggedInUser || {}
            const name = user.name || 'Unknown'
            const userId = user._id || 'Unknown'

            const msg = errorMessage ||
            `${pathName} - missing required param(s): ${missingKeys.join(', ')}`

            loggerService.error('Validation error:', { msg, name, userId, path: pathName })

            return res.status(statusCode).json({ error: msg, missing: missingKeys }) 
        }
        next()
    }
}
    
