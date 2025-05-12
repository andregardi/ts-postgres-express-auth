import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

/**
 * Creates a middleware that validates request body against a Zod schema
 * @param schema The Zod schema to validate against
 * @returns Express middleware function that validates request body
 */
export const validateBody = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Parse and validate the request body against the schema
      const validatedData = schema.parse(req.body)

      // Replace the request body with the validated data
      req.body = validatedData

      // Proceed to the next middleware/controller
      next()
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        })
        return
      }

      // Handle unexpected errors
      res.status(500).json({
        status: 'error',
        message: 'Internal server error during validation',
      })
    }
  }
}
