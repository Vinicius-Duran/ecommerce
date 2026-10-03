'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const category = formData.get('category') as string
  const imageFile = formData.get('image') as File

  let image_url = ''

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('cosmetics-images')
      .upload(fileName, imageFile)

    if (uploadError) throw new Error(uploadError.message)
    
    const { data } = supabaseAdmin.storage.from('cosmetics-images').getPublicUrl(fileName)
    image_url = data.publicUrl
  }

  const { error } = await supabaseAdmin.from('products').insert({
    name,
    description,
    price,
    category,
    image_url,
    in_stock: true
  })

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteProduct(id: string) {
  const { error } = await supabaseAdmin.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function editProduct(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const category = formData.get('category') as string
  const imageFile = formData.get('image') as File

  const updateData: any = { name, description, price, category }

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    
    const { error: uploadError } = await supabaseAdmin
      .storage
      .from('cosmetics-images')
      .upload(fileName, imageFile)

    if (uploadError) throw new Error(uploadError.message)
    
    const { data } = supabaseAdmin.storage.from('cosmetics-images').getPublicUrl(fileName)
    updateData.image_url = data.publicUrl
  }

  const { error } = await supabaseAdmin.from('products').update(updateData).eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/admin')
}
