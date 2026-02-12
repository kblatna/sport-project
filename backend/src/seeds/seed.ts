import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MainPageContent } from '../database/MainPageContent.schema'
import { Navigation } from '../database/Navigation.schema'
import { FooterContent } from '../database/FooterContent.schema'
import { ContactPageContent } from '../database/ContactPageContent.schema'
import { InfoPageContent } from '../database/InfoPageContent.schema'
import { SignupPageContent } from '../database/SignupPageContent.schema'
import { LinksPageContent } from '../database/LinksPageContent.schema'
import { OrganizerPageContent } from '../database/OrganizersPageContent.schema'
import { ResultPageContent } from '../database/ResultPageContent.schema'
import { Result } from '../database/Result.schema'
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

async function bootstrap(): Promise<void> {
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

    await navigationModel.create(navigationData)
    await footerContentModel.create(footerData)
    await mainPageContentModel.create(mainPageData)
    await contactPageContentModel.create(contactPageData)
    await signupPageContentModel.create(signupPageData)
    await linksPageContentModel.create(linksPageData)
    await organizerPageContentModel.create(organizerPageData)
    await resultPageContentModel.create(resultPageData)
    await infoPageContentModel.create(infoPageData)
    await resultModel.insertMany(resultsData)

    await app.close()
}

bootstrap().catch((error) => {
    console.error('Database seeding failed')
    console.error(error)
    process.exit(1)
})
