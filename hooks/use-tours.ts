// hooks/use-tours.ts
import { useState, useEffect } from 'react'

interface TourResponse {
  id: string;
  name: string;
  description: string;
  steps: {
    id: string;
    order_number: number;
    title: string;
    description: string;
  }[];
}

export function useTours() {
  const [tours, setTours] = useState<TourResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTours = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tours')
      const data = await response.json()

      if (!response.ok) {
        throw new Error('Failed to fetch tours')
      }
      
      const transformedTours = data.tours.map((tour: TourResponse) => ({
        id: tour.id,
        name: tour.name,
        description: tour.description,
        steps: tour.steps.map((step) => ({
          id: step.id,
          order_number: step.order_number,
          title: step.title,
          description: step.description,
        })),
      }))
      
      setTours(transformedTours)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tours')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const deleteTour = async (id: string) => {
    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setTours(tours.filter((t) => t.id !== id))
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete tour:', error)
      return false
    }
  }

  return { tours, loading, error, refetch: fetchTours, deleteTour }
}


export function useTourByID(id: string) {
  const [tour, setTour] = useState<TourResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTour = async () => {
    if (!id) return;
    
    try {
      setLoading(true)
      const response = await fetch(`/api/tours/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch tour')
      }

      const data = await response.json() as { tour: TourResponse }
      
      const transformedTour = {
        id: data.tour.id,
        name: data.tour.name,
        description: data.tour.description,
        steps: data.tour.steps.map((step) => ({
          id: step.id,
          order_number: step.order_number,
          title: step.title,
          description: step.description,
        })),
      }
      
      setTour(transformedTour)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tour')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTour()
  }, [])

  const deleteTour = async (id: string) => {
    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setTour(null)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete tour:', error)
      return false
    }
  }

  return { tour, loading, error, refetch: fetchTour, deleteTour }
}



