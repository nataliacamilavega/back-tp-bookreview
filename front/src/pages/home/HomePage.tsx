'use client'
import {useEffect} from 'react'

import {useBannerStore} from '@/store/useBannerStore'
import {useBookStore} from '@/store/useBookStore'
import CoverBooks from '@/components/cards/CoverBooks'

const HomePage = () => {
  const getAllBooks = useBookStore((state) => state.getAllBooks)
  const books = useBookStore((state) => state.books)
  const getAllBanners = useBannerStore((state) => state.getAllBanners)
  const banners = useBannerStore((state) => state.banners)

  useEffect(() => {
    getAllBanners()
    getAllBooks()
  }, [])

  return (
    <>
      <article className=" flex flex-col justify-between gap-6">
        {banners.map(
          (banner) =>
            banner?.section === 'home' &&
            banner?.imageLink && (
              <img
                key={banner?.id}
                alt={banner.title}
                className="w-full object-cover rounded-md max-h-[65vh]"
                src={process.env.NEXT_PUBLIC_API_URL + banner.imageLink}
              />
            ),
        )}
        <div className="flex gap-4 overflow-auto">
          {books.map((book) => (
            <CoverBooks key={book.id} item={book} />
          ))}
        </div>
      </article>
    </>
  )
}

export default HomePage
