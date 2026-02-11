import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MainPageContent } from '../databases/MainPageContent.schema'
import { Navigation } from '../databases/Navigation.schema'
import { FooterContent } from '../databases/FooterContent.schema'
import { ContactPageContent } from '../databases/ContactPageContent.schema'
import { InfoPageContent } from '../databases/InfoPageContent.schema'
import { SignupPageContent } from '../databases/SignupPageContent.schema'
import { LinksPageContent } from '../databases/LinksPageContent.schema'
import { OrganizerPageContent } from '../databases/OrganizersPageContent.schema'
import { ResultPageContent } from '../databases/ResultPageContent.schema'
import { Result } from '../databases/Result.schema'

// Import data from separate files
import { mainPageData } from './data/main-page.data'
import { navigationData } from './data/navigation.data'
import { footerData } from './data/footer.data'
import { contactPageData } from './data/contact-page.data'
import { infoPageData } from './data/info-page.data'
import { signupPageData } from './data/signup-page.data'
import { linksPageData } from './data/links-page.data'
import { organizerPageData } from './data/organizer-page.data'
import { resultPageData } from './data/result-page.data'
import { resultsData } from './data/results.data'

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule)

    const mainPageContentModel = app.get<Model<MainPageContent>>(getModelToken(MainPageContent.name))
    const navigationModel = app.get<Model<Navigation>>(getModelToken(Navigation.name))
    const footerContentModel = app.get<Model<FooterContent>>(getModelToken(FooterContent.name))
    const contactPageContentModel = app.get<Model<ContactPageContent>>(getModelToken(ContactPageContent.name))
    const infoPageContentModel = app.get<Model<InfoPageContent>>(getModelToken(InfoPageContent.name))
    const signupPageContentModel = app.get<Model<SignupPageContent>>(getModelToken(SignupPageContent.name))
    const linksPageContentModel = app.get<Model<LinksPageContent>>(getModelToken(LinksPageContent.name))
    const organizerPageContentModel = app.get<Model<OrganizerPageContent>>(getModelToken(OrganizerPageContent.name))
    const resultPageContentModel = app.get<Model<ResultPageContent>>(getModelToken(ResultPageContent.name))
    const resultModel = app.get<Model<Result>>(getModelToken(Result.name))

    console.log('🌱 Starting database seed...')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Promise.all([
        mainPageContentModel.deleteMany({}),
        navigationModel.deleteMany({}),
        footerContentModel.deleteMany({}),
        contactPageContentModel.deleteMany({}),
        infoPageContentModel.deleteMany({}),
        signupPageContentModel.deleteMany({}),
        linksPageContentModel.deleteMany({}),
        organizerPageContentModel.deleteMany({}),
        resultPageContentModel.deleteMany({}),
        resultModel.deleteMany({})
    ])

    // Seed Navigation
    console.log('📍 Seeding Navigation...')
    await navigationModel.create(navigationData)

    // Seed Footer Content
    console.log('🦶 Seeding Footer Content...')
    await footerContentModel.create(footerData)

    // Seed Main Page Content
    console.log('🏠 Seeding Main Page Content...')
    await mainPageContentModel.create(mainPageData)

    // Seed Contact Page Content
    console.log('📧 Seeding Contact Page Content...')
    await contactPageContentModel.create(contactPageData)

    // Seed Signup Page Content
    console.log('✍️ Seeding Signup Page Content...')
    await signupPageContentModel.create(signupPageData)

    // Seed Links Page Content
    console.log('🔗 Seeding Links Page Content...')
    await linksPageContentModel.create(linksPageData)

    // Seed Organizer Page Content
    console.log('👥 Seeding Organizer Page Content...')
    await organizerPageContentModel.create(organizerPageData)

    // Seed Result Page Content
    console.log('🏆 Seeding Result Page Content...')
    await resultPageContentModel.create(resultPageData)

    // Seed Info Page Content
    console.log('ℹ️ Seeding Info Page Content...')
    await infoPageContentModel.create(infoPageData)

    // Seed Results (sample data)
    console.log('🏁 Seeding Results...')
    await resultModel.insertMany(resultsData)

    console.log('✅ Database seeding completed successfully!')
    console.log('\nSeeded collections:')
    console.log('  ✓ Navigation')
    console.log('  ✓ Footer Content')
    console.log('  ✓ Main Page Content')
    console.log('  ✓ Contact Page Content')
    console.log('  ✓ Signup Page Content')
    console.log('  ✓ Links Page Content')
    console.log('  ✓ Organizer Page Content')
    console.log('  ✓ Result Page Content')
    console.log('  ✓ Info Page Content')
    console.log(`  ✓ Results (${resultsData.length} entries)`)

    console.log('\n🎉 Seed process finished!')
    await app.close()
}

bootstrap()
