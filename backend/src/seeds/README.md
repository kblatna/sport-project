# Database Seeds

This directory contains database seeds for populating the database with default data for development and testing.

## Running Seeds

```bash
npm run seed
```

⚠️ **Warning:** Seeding will delete all existing data in the database!

## What Gets Seeded

### 👤 Users (Admin Accounts)
- **Admin account:** `admin@example.com` / `Admin123!`
  - Role: `admin` - full access to all endpoints
- **Editor account:** `editor@example.com` / `Editor123!`
  - Role: `editor` - basic access

### 📄 Content Pages
- Navigation menu structure
- Footer content and links
- Main/home page content
- Contact page content
- Info page content
- Registration page content
- Links/sponsors page content
- Organizers page content
- Results page content

### 📊 Race Results
- Sample race results for demonstration and testing

## Structure

```
seeds/
├── seed.ts              # Main seed file (entry point)
├── README.md            # This file
└── data/                # Seed data modules
    ├── admin.data.ts           # Administrator accounts
    ├── main-page.data.ts       # Main page content
    ├── navigation.data.ts      # Navigation menu
    ├── footer.data.ts          # Footer content
    ├── contact-page.data.ts    # Contact page
    ├── info-page.data.ts       # Info page
    ├── signup-page.data.ts     # Registration page
    ├── links-page.data.ts      # Links/sponsors page
    ├── organizer-page.data.ts  # Organizers page
    ├── result-page.data.ts     # Results page
    └── results.data.ts         # Sample race results
```

## Seed Data Details

### Admin Accounts (`admin.data.ts`)
Creates user accounts with pre-hashed passwords (bcrypt with 10 salt rounds):
- Admin user with full privileges
- Editor user with limited privileges

### Navigation (`navigation.data.ts`)
Creates the main navigation menu structure with:
- Menu items and labels
- Route paths
- Display order
- Visibility settings

### Content Pages
Each page content seed includes:
- Page title and metadata
- Hero/banner content
- Main content sections
- HTML formatted content (sanitized on frontend)
- Images and media references

### Race Results (`results.data.ts`)
Sample race results including:
- Participant rank and start number
- Name and date of birth
- Race category
- Total time
- Year of the race

## Adding New Seeds

To add new seed data:

1. **Create a data file** in the `data/` directory:
   ```typescript
   // data/new-content.data.ts
   export const newContentData = {
     field1: 'value1',
     field2: 'value2'
   };
   ```

2. **Import data in `seed.ts`:**
   ```typescript
   import { newContentData } from './data/new-content.data';
   ```

3. **Add model to the models list:**
   ```typescript
   const models = [
     { model: NewContentModel, name: 'NewContent' },
     // ... other models
   ];
   ```

4. **Add cleanup step:**
   ```typescript
   await NewContentModel.deleteMany({});
   ```

5. **Add data insertion:**
   ```typescript
   await NewContentModel.create(newContentData);
   // or for multiple records:
   await NewContentModel.insertMany(newContentArray);
   ```

## Development Workflow

### Initial Setup
```bash
# Start database
docker compose up mongodb -d

# Run seeds
npm run seed
```

### Reset Database
```bash
# Stop backend if running
# Run seeds again (this will clear and repopulate)
npm run seed
```

### Verify Seeded Data
```bash
# Connect to MongoDB
docker compose exec mongodb mongosh -u root -p defekt2025 --authenticationDatabase admin

# Use database
use mulda

# Check collections
db.users.countDocuments()
db.results.countDocuments()
db.mainpagecontents.countDocuments()
```

## Security Considerations

🔒 **Production Environment:**

1. **Change default passwords:**
   - Never use seed passwords in production
   - Update admin credentials immediately

2. **Disable seeding:**
   - Remove seed script from production package.json
   - Add environment check to prevent accidental execution

3. **Password hashing:**
   - All passwords are hashed using bcrypt with 10 salt rounds
   - Never store plain text passwords

4. **Environment-specific seeds:**
   - Use different seed data for different environments
   - Keep sensitive data out of version control

## Best Practices

- **Idempotent seeds**: Running multiple times should produce same result
- **Clear data first**: Always delete existing data before seeding
- **Validate data**: Ensure seed data matches current schemas
- **Version control**: Keep seed data in git for consistency
- **Documentation**: Document any special seed requirements

## Troubleshooting

### Seed Script Fails

**Database connection error:**
- Check MongoDB is running: `docker compose ps`
- Verify connection string in `.env`
- Check MongoDB logs: `docker compose logs mongodb`

**Validation errors:**
- Ensure seed data matches current schemas
- Check required fields are present
- Verify data types are correct

**Duplicate key errors:**
- Occurs if deleteMany() fails
- Manually clear collection: `db.collection.drop()`
- Ensure unique indexes are correct

### Verify Seeds Worked

```bash
# Check if data was created
curl http://localhost:3001/api/navigation
curl http://localhost:3001/api/main-page-content
curl http://localhost:3001/api/results?limit=5

# Or use MongoDB Compass
mongodb://root:defekt2025@localhost:27018/mulda?authSource=admin
```

## Related Documentation

- **Main README**: [../../README.md](../../README.md)
- **Backend README**: [../../README.md](../../README.md)
- **Database Schemas**: [../../database/](../../database/)

---

**Note**: This seed data is for development only. Always use appropriate data for production environments.
