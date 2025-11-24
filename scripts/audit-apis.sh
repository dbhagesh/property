#!/bin/bash

echo "==================================="
echo "API ENDPOINTS AUDIT"
echo "==================================="
echo ""

BASE_URL="http://localhost:3000"

# Function to test API endpoint
test_api() {
    local name=$1
    local url=$2
    local expected_status=${3:-200}

    echo "Testing: $name"
    echo "URL: $url"

    response=$(curl -s -w "\n%{http_code}" "$url" 2>&1 | tail -n 1)

    if [ "$response" = "$expected_status" ]; then
        echo "✅ Status: $response"
    else
        echo "❌ Status: $response (expected $expected_status)"
    fi
    echo ""
}

# Test Public APIs
echo "📡 PUBLIC APIs"
echo "-----------------------------------"

test_api "Areas List" "$BASE_URL/api/areas"
test_api "Area Detail" "$BASE_URL/api/areas/dlf-phase-5"
test_api "Properties List" "$BASE_URL/api/properties"
test_api "Property Detail" "$BASE_URL/api/properties/luxury-4bhk-apartment-in-dlf-phase-5"
test_api "Properties Filter (3BHK)" "$BASE_URL/api/properties?bedrooms=3"
test_api "Properties Search" "$BASE_URL/api/properties?search=luxury"
test_api "Contact Submit (GET - should fail)" "$BASE_URL/api/contact/submit" 405

echo ""
echo "📱 FRONTEND PAGES"
echo "-----------------------------------"

test_api "Homepage" "$BASE_URL/"
test_api "Properties Listing" "$BASE_URL/properties"
test_api "Property Detail" "$BASE_URL/properties/luxury-4bhk-apartment-in-dlf-phase-5"
test_api "Area Detail" "$BASE_URL/deals/dlf-phase-5"
test_api "About Page" "$BASE_URL/about"
test_api "Contact Page" "$BASE_URL/contact"
test_api "Blog Listing" "$BASE_URL/blog"
test_api "Admin Login" "$BASE_URL/admin/login"

echo ""
echo "🔒 PROTECTED ROUTES (Should redirect to login)"
echo "-----------------------------------"

test_api "Admin Dashboard" "$BASE_URL/admin" 307
test_api "Admin Areas" "$BASE_URL/admin/areas" 307
test_api "Admin Properties" "$BASE_URL/admin/properties" 307

echo ""
echo "==================================="
echo "AUDIT COMPLETE"
echo "==================================="
