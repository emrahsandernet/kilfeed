import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const fileName = formData.get('fileName') as string

    if (!file || !fileName) {
      return NextResponse.json(
        { error: 'Dosya ve dosya adı gereklidir' },
        { status: 400 }
      )
    }

    // Dosyayı byte array'e çevir
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Public/logos klasör yolunu belirle
    const logosDirPath = join(process.cwd(), 'public', 'logos')
    
    // Klasör yoksa oluştur
    if (!existsSync(logosDirPath)) {
      try {
        await mkdir(logosDirPath, { recursive: true })
        console.log(`Klasör oluşturuldu: ${logosDirPath}`)
      } catch (mkdirError) {
        console.error('Klasör oluşturma hatası:', mkdirError)
        return NextResponse.json(
          { error: 'Klasör oluşturulamadı', details: mkdirError },
          { status: 500 }
        )
      }
    }
    
    // Dosya yolu
    const filePath = join(logosDirPath, fileName)
    
    // Dosyayı kaydet
    try {
      await writeFile(filePath, buffer)
      console.log(`Dosya kaydedildi: ${filePath}`)
    } catch (writeError) {
      console.error('Dosya yazma hatası:', writeError)
      return NextResponse.json(
        { error: 'Dosya yazılamadı', details: writeError },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      filePath: `/logos/${fileName}` 
    })
  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    return NextResponse.json(
      { error: 'Dosya yükleme hatası', details: error },
      { status: 500 }
    )
  }
} 