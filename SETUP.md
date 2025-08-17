# 🔥 Heatcheck Setup Guide

## YouTube API Configuration

Your Heatcheck app currently uses demo data. To get real YouTube videos, you'll need to set up the YouTube Data API v3.

### Step 1: Get YouTube API Key

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select an existing one
3. **Enable the YouTube Data API v3**:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. **Create credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key

### Step 2: Configure Environment Variable

**For Local Development:**
1. Open the `.env` file in your project root
2. Replace `your_youtube_api_key_here` with your actual API key:
   ```env
   VITE_YOUTUBE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Save the file and refresh your browser

**For Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add a new variable:
   - **Name**: `VITE_YOUTUBE_API_KEY`
   - **Value**: Your YouTube API key
   - **Environment**: Production (and Development if needed)
4. Redeploy your application

### Step 3: Test the Integration

1. **Refresh your Heatcheck app**
2. **Check the browser console** for any API errors
3. **Look for the info banner** to disappear once the API is working
4. **Verify real video data** is loading instead of demo content

## API Limits & Costs

- **Free Tier**: 10,000 requests per day
- **Cost**: $0.50 per 1,000 additional requests
- **Heatcheck Usage**: ~25-50 API requests per page load
- **Estimated Daily Capacity**: ~400-800 page loads on free tier

## Troubleshooting

### "API key not configured" Error
- Check that `VITE_YOUTUBE_API_KEY` is set in your environment variables
- Ensure there are no extra spaces or quotes around the API key

### "YouTube API error: 403" Error  
- Your API key may be invalid or restricted
- Check API quotas in Google Cloud Console
- Verify YouTube Data API v3 is enabled

### "YouTube API error: 400" Error
- API request format issue (should be handled automatically)
- Check browser console for detailed error messages

### Still Using Demo Data?
- Clear browser cache and hard refresh (Ctrl+F5 / Cmd+Shift+R)
- Check browser console for error messages
- Verify environment variables are properly set

## Production Checklist

✅ YouTube API key configured  
✅ Environment variables set in Vercel  
✅ API quotas sufficient for expected traffic  
✅ Error handling working correctly  
✅ Demo data fallback functional  

---

**Need help?** Contact: ryan.mccaulsky@gmail.com