import React, { useState, useEffect } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";
import { stratify, tree } from "d3-hierarchy";

// Mock JSON Data
let mockData = {
  nodes: [
    {
      id: "ab033a0e",
      data: {
        label: "trump gets impeached",
      },
    },
    {
      id: "47d568f7",
      data: {
        label: "Republican Party",
      },
    },
    {
      id: "597010df",
      data: {
        label: "Stock Market",
      },
    },
    {
      id: "89c1e085",
      data: {
        label: "Corporate Businesses",
      },
    },
    {
      id: "ae726c4b",
      data: {
        label: "Wealthy Donors",
      },
    },
    {
      id: "aa0fd757",
      data: {
        label: "Stock Market",
      },
    },
    {
      id: "b63c868b",
      data: {
        label: "Consumer Spending",
      },
    },
    {
      id: "5cbfd4f2",
      data: {
        label: "Global Economies",
      },
    },
    {
      id: "44082af9",
      data: {
        label: "Technology Sector",
      },
    },
    {
      id: "d3e29d60",
      data: {
        label: "Trump's Brand",
      },
    },
    {
      id: "d32f78ad",
      data: {
        label: "Tourism in Florida",
      },
    },
    {
      id: "d785cfc2",
      data: {
        label: "Caribbean Tourism",
      },
    },
    {
      id: "3e1929e2",
      data: {
        label: "Marine Ecosystems",
      },
    },
    {
      id: "199ef90a",
      data: {
        label: "Local Artists and Craftspeople",
      },
    },
    {
      id: "efe89a7c",
      data: {
        label: "Airline Companies",
      },
    },
    {
      id: "7f512e18",
      data: {
        label: "Florida Real Estate",
      },
    },
    {
      id: "c470b047",
      data: {
        label: "Florida Service Industry",
      },
    },
    {
      id: "4e7fea75",
      data: {
        label: "Cruise Line Companies",
      },
    },
    {
      id: "1b67836b",
      data: {
        label: "Theme Park Attendance",
      },
    },
    {
      id: "4f8beb2f",
      data: {
        label: "Hospitality Workers Union",
      },
    },
    {
      id: "f90456c6",
      data: {
        label: "Licensed Merchandise Sales",
      },
    },
    {
      id: "0be56a61",
      data: {
        label: "Museums and Galleries",
      },
    },
    {
      id: "9d84a16f",
      data: {
        label: "Fashion Designers",
      },
    },
    {
      id: "0dac2e2d",
      data: {
        label: "Local Artists",
      },
    },
    {
      id: "6a1a866a",
      data: {
        label: "Tourist Attractions",
      },
    },
    {
      id: "d81cc054",
      data: {
        label: "Artisanal Communities",
      },
    },
    {
      id: "b976cf27",
      data: {
        label: "Cooperative Banks",
      },
    },
    {
      id: "69ec74b5",
      data: {
        label: "Customs Brokers",
      },
    },
    {
      id: "b720497e",
      data: {
        label: "Heritage Conservation Societies",
      },
    },
    {
      id: "a768f458",
      data: {
        label: "Fandom Communities",
      },
    },
    {
      id: "a960e14c",
      data: {
        label: "Global Cosplay Industry",
      },
    },
    {
      id: "2844728a",
      data: {
        label: "Indie Game Developers",
      },
    },
    {
      id: "d4f9cc87",
      data: {
        label: "Collectible Item Manufacturers",
      },
    },
    {
      id: "f5d34e66",
      data: {
        label: "Global Tourists",
      },
    },
    {
      id: "759663fe",
      data: {
        label: "Print-on-Demand Services",
      },
    },
    {
      id: "b99add35",
      data: {
        label: "Fashion Designers",
      },
    },
    {
      id: "850b9421",
      data: {
        label: "Independent Artists",
      },
    },
    {
      id: "f04d7945",
      data: {
        label: "E-commerce Platforms",
      },
    },
    {
      id: "99329ecd",
      data: {
        label: "Memorabilia Collectors",
      },
    },
    {
      id: "220b50a6",
      data: {
        label: "Gold and Silver Prices",
      },
    },
    {
      id: "cdadd058",
      data: {
        label: "Indian IT Sector",
      },
    },
    {
      id: "5a658348",
      data: {
        label: "Australian Mining Industry",
      },
    },
    {
      id: "51ea63d3",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "2d325e6e",
      data: {
        label: "Custom Artisanal Merchandise",
      },
    },
    {
      id: "42c317f4",
      data: {
        label: "Vintage Memorabilia Dealers",
      },
    },
    {
      id: "ac82dcf0",
      data: {
        label: "Political Donors",
      },
    },
    {
      id: "42dd2fa4",
      data: {
        label: "Microsoft Corporation",
      },
    },
    {
      id: "90dbbb33",
      data: {
        label: "Olympic Committee",
      },
    },
    {
      id: "d2949db5",
      data: {
        label: "National Sporting Federations",
      },
    },
    {
      id: "904c81d9",
      data: {
        label: "Urban Development Companies",
      },
    },
    {
      id: "80b557c4",
      data: {
        label: "Broadcast Rights Holders",
      },
    },
    {
      id: "186c5e95",
      data: {
        label: "Historical Landmark Preservation",
      },
    },
    {
      id: "09556298",
      data: {
        label: "Google Maps",
      },
    },
    {
      id: "84a43b2b",
      data: {
        label: "Local Restaurants",
      },
    },
    {
      id: "e2094c5d",
      data: {
        label: "Regional Tourism",
      },
    },
    {
      id: "6e36dfd7",
      data: {
        label: "Artisan Businesses",
      },
    },
    {
      id: "f2c432ed",
      data: {
        label: "Tanzanian Woodcarvers",
      },
    },
    {
      id: "458ac30e",
      data: {
        label: "Peruvian Textile Makers",
      },
    },
    {
      id: "d7be3bbf",
      data: {
        label: "Moroccan Craftsmen",
      },
    },
    {
      id: "7f9a0fb8",
      data: {
        label: "Airbnb Hosts",
      },
    },
    {
      id: "ca038474",
      data: {
        label: "Historical Reenactment Companies",
      },
    },
    {
      id: "c8c8e430",
      data: {
        label: "Arts and Cultural Funding",
      },
    },
    {
      id: "5d744a5f",
      data: {
        label: "US Universities",
      },
    },
    {
      id: "4a6841d7",
      data: {
        label: "Amazon",
      },
    },
    {
      id: "cfd34b00",
      data: {
        label: "Singapore Government",
      },
    },
    {
      id: "50c9121a",
      data: {
        label: "Google",
      },
    },
    {
      id: "528f5049",
      data: {
        label: "Tencent Holdings",
      },
    },
    {
      id: "dec1ba44",
      data: {
        label: "NASA",
      },
    },
    {
      id: "d4a67763",
      data: {
        label: "HSBC",
      },
    },
    {
      id: "12ef7f1a",
      data: {
        label: "Public Libraries",
      },
    },
    {
      id: "2fd2587f",
      data: {
        label: "Museum Exhibits",
      },
    },
    {
      id: "a8e7496a",
      data: {
        label: "Local Historical Societies",
      },
    },
    {
      id: "7cc653ac",
      data: {
        label: "Local Businesses",
      },
    },
    {
      id: "271531ff",
      data: {
        label: "Academic Institutions",
      },
    },
    {
      id: "b89a95d5",
      data: {
        label: "Historical Preservation Groups",
      },
    },
    {
      id: "648307d0",
      data: {
        label: "Indigenous Cultural Centers",
      },
    },
    {
      id: "55803fda",
      data: {
        label: "Community Development Projects",
      },
    },
    {
      id: "e8263000",
      data: {
        label: "Local Nonprofits",
      },
    },
    {
      id: "314b7d02",
      data: {
        label: "Community Banks",
      },
    },
    {
      id: "da8235e6",
      data: {
        label: "Local Businesses",
      },
    },
    {
      id: "9db74e07",
      data: {
        label: "Conservation Efforts",
      },
    },
    {
      id: "d9d938ea",
      data: {
        label: "Agricultural Practices",
      },
    },
    {
      id: "8e43365e",
      data: {
        label: "Local Fisheries",
      },
    },
    {
      id: "42d0fad4",
      data: {
        label: "Sustainable Energy Companies",
      },
    },
    {
      id: "b707f750",
      data: {
        label: "Local Indigenous Communities",
      },
    },
    {
      id: "5d8e4be8",
      data: {
        label: "Food Retailers",
      },
    },
    {
      id: "58d17605",
      data: {
        label: "Cooperative Banks",
      },
    },
    {
      id: "4ee99971",
      data: {
        label: "Media Outlets",
      },
    },
    {
      id: "7109b53a",
      data: {
        label: "Public Opinion",
      },
    },
    {
      id: "4e060449",
      data: {
        label: "Global Travel Industry",
      },
    },
    {
      id: "718afb92",
      data: {
        label: "Airline Companies",
      },
    },
    {
      id: "474411b0",
      data: {
        label: "Hotel Industry",
      },
    },
    {
      id: "1f931a10",
      data: {
        label: "Car Rental Firms",
      },
    },
    {
      id: "b7de4940",
      data: {
        label: "Travel Insurance Providers",
      },
    },
    {
      id: "5738d21f",
      data: {
        label: "Travel Insurance Providers",
      },
    },
    {
      id: "8e7adda4",
      data: {
        label: "Adventure Sports Companies",
      },
    },
    {
      id: "f42616e2",
      data: {
        label: "Local Tour Guides",
      },
    },
    {
      id: "a8832521",
      data: {
        label: "Niche Travel Agencies",
      },
    },
    {
      id: "9c7f7a2d",
      data: {
        label: "Hotel Chains",
      },
    },
    {
      id: "5436944c",
      data: {
        label: "NGO Funding",
      },
    },
    {
      id: "f9617147",
      data: {
        label: "International Aid Organizations",
      },
    },
    {
      id: "66d6fbae",
      data: {
        label: "Local Governments in developing countries",
      },
    },
    {
      id: "d4cf1140",
      data: {
        label: "Indigenous Communities",
      },
    },
    {
      id: "0277031f",
      data: {
        label: "Local Entrepreneurs",
      },
    },
    {
      id: "d11d8908",
      data: {
        label: "Small Farmers",
      },
    },
    {
      id: "807c3fc2",
      data: {
        label: "Refugee camps and humanitarian aid programs",
      },
    },
    {
      id: "a4e1221b",
      data: {
        label: "Relief Supply Manufacturers",
      },
    },
    {
      id: "971ded72",
      data: {
        label: "Psychological Counseling Services",
      },
    },
    {
      id: "03ed9606",
      data: {
        label: "Logistics and Transportation",
      },
    },
    {
      id: "4c643c22",
      data: {
        label: "Global Shipping Industry",
      },
    },
    {
      id: "96749a18",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "eab3305b",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "79314e39",
      data: {
        label: "International NGOs working on the ground",
      },
    },
    {
      id: "495827ab",
      data: {
        label: "Indonesian Batik Industry",
      },
    },
    {
      id: "c9fe3f83",
      data: {
        label: "Egyptian Antiquities Sector",
      },
    },
    {
      id: "14d7e4d1",
      data: {
        label: "Peruvian Weaving Communities",
      },
    },
    {
      id: "c3f5a1ad",
      data: {
        label: "Human Rights Organizations",
      },
    },
    {
      id: "1e0f8e0e",
      data: {
        label: "Corporations",
      },
    },
    {
      id: "69b04b78",
      data: {
        label: "Religious Institutions",
      },
    },
    {
      id: "9c19caa9",
      data: {
        label: "Energy Companies",
      },
    },
    {
      id: "3816db44",
      data: {
        label: "Infrastructure Development Projects",
      },
    },
    {
      id: "35d99fe7",
      data: {
        label: "Construction Companies",
      },
    },
    {
      id: "f03ca80c",
      data: {
        label: "Urban Planners",
      },
    },
    {
      id: "7283ff1f",
      data: {
        label: "Homeowners Associations",
      },
    },
    {
      id: "0092e73d",
      data: {
        label: "Local Employment Rates",
      },
    },
    {
      id: "6d662d55",
      data: {
        label: "Local Banks",
      },
    },
    {
      id: "5395e10f",
      data: {
        label: "Heavy Machinery Manufacturers",
      },
    },
    {
      id: "90f9cfe9",
      data: {
        label: "Fact-Checking Organizations",
      },
    },
    {
      id: "2f2675b3",
      data: {
        label: "Voter Turnout",
      },
    },
    {
      id: "59672175",
      data: {
        label: "Local Credit Unions",
      },
    },
    {
      id: "70f41829",
      data: {
        label: "Local Farmers",
      },
    },
    {
      id: "f1802b01",
      data: {
        label: "Women Entrepreneurs",
      },
    },
    {
      id: "a55ffa35",
      data: {
        label: "Small Business Owners",
      },
    },
    {
      id: "f0ce2510",
      data: {
        label: "Local Cooperatives",
      },
    },
    {
      id: "cf246607",
      data: {
        label: "Rural Communities",
      },
    },
    {
      id: "eebccd6a",
      data: {
        label: "Arts and Culture",
      },
    },
    {
      id: "dbdac1db",
      data: {
        label: "Community Development",
      },
    },
    {
      id: "1b9c5d9a",
      data: {
        label: "Swiss Banking System",
      },
    },
    {
      id: "58544505",
      data: {
        label: "Gold Reserves and Gold Prices",
      },
    },
    {
      id: "8be3c1b7",
      data: {
        label: "Global Commodity Traders and Prices",
      },
    },
    {
      id: "a9210c1d",
      data: {
        label: "Russian Oligarchs and Wealth",
      },
    },
    {
      id: "248a67f1",
      data: {
        label: "Canadian Immigration Policies",
      },
    },
    {
      id: "8377ab89",
      data: {
        label: "Nonprofit Organizations",
      },
    },
    {
      id: "2db73469",
      data: {
        label: "Native American Tribes",
      },
    },
    {
      id: "7df7617d",
      data: {
        label: "Arts and Cultural Institutions",
      },
    },
    {
      id: "8a06b540",
      data: {
        label: "Women's Empowerment Organizations",
      },
    },
    {
      id: "c8b72c8f",
      data: {
        label: "Google Inc.",
      },
    },
    {
      id: "6bfd1b26",
      data: {
        label: "Search Engine Market",
      },
    },
    {
      id: "45a388cf",
      data: {
        label: "Online Advertising Industry",
      },
    },
    {
      id: "6299aada",
      data: {
        label: "Artificial Intelligence Research",
      },
    },
    {
      id: "eb972b5e",
      data: {
        label: "World Bank",
      },
    },
    {
      id: "c59ca2cb",
      data: {
        label: "IKEA Group",
      },
    },
    {
      id: "4c89a0de",
      data: {
        label: "Food Truck Industry",
      },
    },
    {
      id: "add09db7",
      data: {
        label: "Local Event Planners",
      },
    },
    {
      id: "7a633408",
      data: {
        label: "Sustainable Furniture Makers",
      },
    },
    {
      id: "b3c3392b",
      data: {
        label: "Civic Engagement",
      },
    },
    {
      id: "a8d5f64c",
      data: {
        label: "Community Gardens",
      },
    },
    {
      id: "6eb58bf9",
      data: {
        label: "Craft Beer Industry",
      },
    },
    {
      id: "9f755d6a",
      data: {
        label: "Innovation Hubs",
      },
    },
    {
      id: "938a4426",
      data: {
        label: "Mental Health Services",
      },
    },
    {
      id: "80a63dbd",
      data: {
        label: "Historical Landmark Preservation",
      },
    },
    {
      id: "85e0b6cd",
      data: {
        label: "Arts and Cultural Funding",
      },
    },
    {
      id: "8fe59245",
      data: {
        label: "Conservation Efforts",
      },
    },
    {
      id: "049a9b76",
      data: {
        label: "Local Banks",
      },
    },
    {
      id: "2d80ddd0",
      data: {
        label: "Local Food Banks",
      },
    },
    {
      id: "0be75864",
      data: {
        label: "Public Libraries",
      },
    },
    {
      id: "3ec19f58",
      data: {
        label: "Social Media Platforms",
      },
    },
    {
      id: "795d758b",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "f540353d",
      data: {
        label: "Sri Lankan Tea Industry",
      },
    },
    {
      id: "27a21206",
      data: {
        label: "British Tea Industry",
      },
    },
    {
      id: "c52705f0",
      data: {
        label: "Indian Tea Industry",
      },
    },
    {
      id: "15b976d3",
      data: {
        label: "Coffee Industry",
      },
    },
    {
      id: "4e654789",
      data: {
        label: "Global Beverage Market",
      },
    },
    {
      id: "7b16cda7",
      data: {
        label: "Sri Lankan Tea Producers",
      },
    },
    {
      id: "ec013a11",
      data: {
        label: "Tea Consumers Worldwide",
      },
    },
    {
      id: "ca0d0158",
      data: {
        label: "Indian IT Sector",
      },
    },
    {
      id: "569be88d",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "47be50bc",
      data: {
        label: "Ghanaian Cocoa Farmers",
      },
    },
    {
      id: "1bf586cc",
      data: {
        label: "Chocolate Manufacturers",
      },
    },
    {
      id: "41225735",
      data: {
        label: "Cocoa Processing Plants",
      },
    },
    {
      id: "c0cbcd0e",
      data: {
        label: "Ghanaian Export Economy",
      },
    },
    {
      id: "cb6501e5",
      data: {
        label: "Fijian Vanilla Exporters",
      },
    },
    {
      id: "50d71bbd",
      data: {
        label: "Fijian Vanilla Farmers",
      },
    },
    {
      id: "c1dcf616",
      data: {
        label: "Local Fijian Cooperatives",
      },
    },
    {
      id: "665e8518",
      data: {
        label: "International Vanilla Buyers",
      },
    },
    {
      id: "8855258f",
      data: {
        label: "Australian Coffee Roasters",
      },
    },
    {
      id: "e5f3a417",
      data: {
        label: "Australian Food Processors",
      },
    },
    {
      id: "f750696a",
      data: {
        label: "Southeast Asian Street Vendors",
      },
    },
    {
      id: "5f68f813",
      data: {
        label: "European Artisanal Coffee Shops",
      },
    },
    {
      id: "e30775bf",
      data: {
        label: "Ethiopian Coffee Cooperatives",
      },
    },
    {
      id: "690d80cb",
      data: {
        label: "Colombian Coffee Industry",
      },
    },
    {
      id: "db762b49",
      data: {
        label: "Global Coffee Price Trends",
      },
    },
    {
      id: "e3ffc79e",
      data: {
        label: "Sumatran Coffee Farmers",
      },
    },
    {
      id: "4c67375e",
      data: {
        label: "French Bakery Industry",
      },
    },
    {
      id: "1b2d6f04",
      data: {
        label: "Belgian Chocolate Makers",
      },
    },
    {
      id: "b42cfcb8",
      data: {
        label: "Italian Gelato Shops",
      },
    },
    {
      id: "7bc55127",
      data: {
        label: "Swedish Pastry Chefs",
      },
    },
    {
      id: "57154472",
      data: {
        label: "Singaporean Food Manufacturers",
      },
    },
    {
      id: "ae6cc92f",
      data: {
        label: "Small Business Owners",
      },
    },
    {
      id: "59e37ada",
      data: {
        label: "Local Communities",
      },
    },
    {
      id: "4bb712ce",
      data: {
        label: "Local Libraries",
      },
    },
    {
      id: "1f24198f",
      data: {
        label: "Local Small Businesses",
      },
    },
    {
      id: "4a77c996",
      data: {
        label: "Regional Tourists",
      },
    },
    {
      id: "0cd2f713",
      data: {
        label: "Local Artisans",
      },
    },
    {
      id: "69b8a7f7",
      data: {
        label: "Community Gardens",
      },
    },
    {
      id: "6f887731",
      data: {
        label: "Local Food Security Organizations",
      },
    },
    {
      id: "4c8e2371",
      data: {
        label: "Small Local Businesses",
      },
    },
    {
      id: "d3746924",
      data: {
        label: "Neighborhood Social Cohesion",
      },
    },
    {
      id: "0b240592",
      data: {
        label: "Local Museums",
      },
    },
    {
      id: "a6bebb58",
      data: {
        label: "Local Art Communities",
      },
    },
    {
      id: "45d48750",
      data: {
        label: "Small Heritage Sites",
      },
    },
    {
      id: "52facf22",
      data: {
        label: "Community Historical Societies",
      },
    },
    {
      id: "78a6deb2",
      data: {
        label: "Family Finances",
      },
    },
    {
      id: "542b7596",
      data: {
        label: "Global Food Prices",
      },
    },
    {
      id: "d7e752f8",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "d415361d",
      data: {
        label: "Indian IT Sector",
      },
    },
    {
      id: "ef74136f",
      data: {
        label: "British Tea Industry",
      },
    },
    {
      id: "8f4939f8",
      data: {
        label: "Charitable Donations",
      },
    },
    {
      id: "39880365",
      data: {
        label: "Local Businesses",
      },
    },
    {
      id: "7483be94",
      data: {
        label: "Innovation Hubs",
      },
    },
    {
      id: "c4fea489",
      data: {
        label: "Environmental Activists",
      },
    },
    {
      id: "19e3e495",
      data: {
        label: "Real Estate Developers",
      },
    },
    {
      id: "1307ac44",
      data: {
        label: "Local Construction Industry",
      },
    },
    {
      id: "37fe1071",
      data: {
        label: "Local Restaurants",
      },
    },
    {
      id: "0407c7f6",
      data: {
        label: "Local Art Galleries",
      },
    },
    {
      id: "71350b43",
      data: {
        label: "Community Events",
      },
    },
    {
      id: "5c2a038f",
      data: {
        label: "Neighborhood Demographics",
      },
    },
    {
      id: "29d3964f",
      data: {
        label: "Insurance Companies",
      },
    },
    {
      id: "8ca56a96",
      data: {
        label: "U.S. Economy",
      },
    },
    {
      id: "93d69400",
      data: {
        label: "China Trade",
      },
    },
    {
      id: "8a9db3e7",
      data: {
        label: "Technology Startups",
      },
    },
    {
      id: "40796f73",
      data: {
        label: "Environmental Groups",
      },
    },
    {
      id: "2092c4c3",
      data: {
        label: "International Aid Organizations",
      },
    },
    {
      id: "fb820742",
      data: {
        label: "Local Conservation Efforts",
      },
    },
    {
      id: "36c5452c",
      data: {
        label: "Fossil Fuel Companies",
      },
    },
    {
      id: "ab6c7ea8",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "5d8482ee",
      data: {
        label: "Colombian Coffee Farmers",
      },
    },
    {
      id: "3600221a",
      data: {
        label: "Kenyan Leather Industry",
      },
    },
    {
      id: "c7780b79",
      data: {
        label: "Thai Cuisine Restaurants",
      },
    },
    {
      id: "6e33fba6",
      data: {
        label: "Bangladeshi Textile Industry",
      },
    },
    {
      id: "b305d564",
      data: {
        label: "Kenyan Coffee Exporters",
      },
    },
    {
      id: "b7bf7085",
      data: {
        label: "Local Artisan Communities",
      },
    },
    {
      id: "95f61f27",
      data: {
        label: "European Union",
      },
    },
    {
      id: "3f3bd227",
      data: {
        label: "NATO Alliance",
      },
    },
    {
      id: "7b920f02",
      data: {
        label: "Volkswagen Company",
      },
    },
    {
      id: "d5a6a348",
      data: {
        label: "Electric Vehicle Market",
      },
    },
    {
      id: "cda55150",
      data: {
        label: "German Economy",
      },
    },
    {
      id: "65484169",
      data: {
        label: "Global Supply Chains",
      },
    },
    {
      id: "0d95b464",
      data: {
        label: "Russian Oligarchs",
      },
    },
    {
      id: "3df33f87",
      data: {
        label: "Apple Inc.",
      },
    },
    {
      id: "716da417",
      data: {
        label: "Samsung Electronics",
      },
    },
    {
      id: "c84f0054",
      data: {
        label: "Consumer Electronics Manufacturers",
      },
    },
    {
      id: "a5adbf76",
      data: {
        label: "Smartphone Application Developers",
      },
    },
    {
      id: "47911770",
      data: {
        label: "Telecommunications Service Providers",
      },
    },
    {
      id: "16a9083a",
      data: {
        label: "Environmental Organizations",
      },
    },
    {
      id: "e532e319",
      data: {
        label: "International Coffee Trade",
      },
    },
    {
      id: "2b1e71cb",
      data: {
        label: "Guatemalan Coffee Producers",
      },
    },
    {
      id: "9f98fe01",
      data: {
        label: "Tanzanian Tea Exporters",
      },
    },
    {
      id: "a205521a",
      data: {
        label: "Vietnamese Robusta Farmers",
      },
    },
    {
      id: "4537becf",
      data: {
        label: "Luxury Car Manufacturers",
      },
    },
    {
      id: "5492cc26",
      data: {
        label: "Global Shipping Industry",
      },
    },
    {
      id: "562187b1",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "0b856c33",
      data: {
        label: "Artisan Markets",
      },
    },
    {
      id: "9da93c3b",
      data: {
        label: "Food Trucks",
      },
    },
    {
      id: "c568d690",
      data: {
        label: "Independent Bookstores",
      },
    },
    {
      id: "de4feae3",
      data: {
        label: "White House Staff",
      },
    },
    {
      id: "16a90677",
      data: {
        label: "Federal Reserve",
      },
    },
    {
      id: "027546f8",
      data: {
        label: "Global Commodity Prices",
      },
    },
    {
      id: "bf2bfedb",
      data: {
        label: "Airlines Industry",
      },
    },
    {
      id: "7aad87dd",
      data: {
        label: "Food Manufacturing Companies",
      },
    },
    {
      id: "5229fc49",
      data: {
        label: "Shipping Companies",
      },
    },
    {
      id: "0010f1c2",
      data: {
        label: "Foreign Exchange Rates",
      },
    },
    {
      id: "fbf65875",
      data: {
        label: "Import/Export Companies",
      },
    },
    {
      id: "3fe55b97",
      data: {
        label: "Logistics and Supply Chain",
      },
    },
    {
      id: "570bf044",
      data: {
        label: "Consumer Behavior",
      },
    },
    {
      id: "52ada557",
      data: {
        label: "Energy Resources",
      },
    },
    {
      id: "3a7d3f78",
      data: {
        label: "Multinational Corporations",
      },
    },
    {
      id: "9ba3b1f8",
      data: {
        label: "Remittance Services",
      },
    },
    {
      id: "f919ea4c",
      data: {
        label: "US Supreme Court",
      },
    },
    {
      id: "0f0a1301",
      data: {
        label: "Tech Companies",
      },
    },
    {
      id: "a036d338",
      data: {
        label: "Smart Home Manufacturers",
      },
    },
    {
      id: "ad9914e6",
      data: {
        label: "Home Security Providers",
      },
    },
    {
      id: "0c1d406a",
      data: {
        label: "Energy Efficiency Advocates",
      },
    },
    {
      id: "e9cce384",
      data: {
        label: "Home Insurance Companies",
      },
    },
    {
      id: "fb305044",
      data: {
        label: "AI Ethics Committees",
      },
    },
    {
      id: "7c2c570f",
      data: {
        label: "Digital Marketing Agencies",
      },
    },
    {
      id: "cd5d4834",
      data: {
        label: "Local Media Outlets",
      },
    },
    {
      id: "5710b939",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "9186a7f6",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "1f7b0919",
      data: {
        label: "Brazilian Coffee Farmers",
      },
    },
    {
      id: "11576c79",
      data: {
        label: "Political Campaigns",
      },
    },
    {
      id: "65178196",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "edec970a",
      data: {
        label: "Family Finances",
      },
    },
    {
      id: "4f2264b3",
      data: {
        label: "Homeless Shelters",
      },
    },
    {
      id: "f8992ddc",
      data: {
        label: "Nonprofit Organizations",
      },
    },
    {
      id: "85fb5e99",
      data: {
        label: "Pharmaceutical Industry",
      },
    },
    {
      id: "575618d4",
      data: {
        label: "Hospital Systems",
      },
    },
    {
      id: "21592509",
      data: {
        label: "Insurance Companies",
      },
    },
    {
      id: "ef14647b",
      data: {
        label: "Mortgage Lenders",
      },
    },
    {
      id: "ab5ffc73",
      data: {
        label: "Real Estate Developers",
      },
    },
    {
      id: "7bbd6d02",
      data: {
        label: "Insurance Companies",
      },
    },
    {
      id: "562594e4",
      data: {
        label: "Homeless Shelters",
      },
    },
    {
      id: "735dbf30",
      data: {
        label: "Community Centers",
      },
    },
    {
      id: "7adfd3f2",
      data: {
        label: "Artisan Businesses",
      },
    },
    {
      id: "a24019bd",
      data: {
        label: "Research Institutions",
      },
    },
    {
      id: "b2fbd659",
      data: {
        label: "Migrant Workers",
      },
    },
    {
      id: "5ecffa8c",
      data: {
        label: "Amazon Inc.",
      },
    },
    {
      id: "d48191ce",
      data: {
        label: "Global Supply Chains",
      },
    },
    {
      id: "aad3fcfe",
      data: {
        label: "Local Retailers",
      },
    },
    {
      id: "2daee2bc",
      data: {
        label: "Cloud Computing Market",
      },
    },
    {
      id: "8f76e6ee",
      data: {
        label: "IBM Corporation",
      },
    },
    {
      id: "b32a4fed",
      data: {
        label: "Data Scientists",
      },
    },
    {
      id: "6d781ea1",
      data: {
        label: "Cybersecurity Firms",
      },
    },
    {
      id: "7ad79677",
      data: {
        label: "Global Food Prices",
      },
    },
    {
      id: "48bc6f67",
      data: {
        label: "Australian Agriculture Industry",
      },
    },
    {
      id: "c6c95dad",
      data: {
        label: "Canada's Construction Industry",
      },
    },
    {
      id: "af603370",
      data: {
        label: "Global Diplomatic Relations",
      },
    },
    {
      id: "5c178be6",
      data: {
        label: "Small Business Owners",
      },
    },
    {
      id: "9a69f314",
      data: {
        label: "Automotive Industry",
      },
    },
    {
      id: "4cd759df",
      data: {
        label: "Entertainment Industry",
      },
    },
    {
      id: "c02499ae",
      data: {
        label: "Food Industry",
      },
    },
    {
      id: "7be577a6",
      data: {
        label: "Middle-Class Families",
      },
    },
    {
      id: "cad79930",
      data: {
        label: "Middle Eastern Investors",
      },
    },
    {
      id: "426b96b8",
      data: {
        label: "Tanzanian Gemstone Mines",
      },
    },
    {
      id: "5633b910",
      data: {
        label: "Pakistani Textile Industry",
      },
    },
    {
      id: "d4dd3ebd",
      data: {
        label: "Turkish Hospitality Sector",
      },
    },
    {
      id: "ba1e7aad",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "c2a7146d",
      data: {
        label: "Latin American Manufacturing",
      },
    },
    {
      id: "abb0cc08",
      data: {
        label: "Global Tech Industry",
      },
    },
    {
      id: "28390701",
      data: {
        label: "Global Supply Chains",
      },
    },
    {
      id: "9b266420",
      data: {
        label: "Global Shipping Companies",
      },
    },
    {
      id: "0daec53d",
      data: {
        label: "Local Restaurants",
      },
    },
    {
      id: "74959f72",
      data: {
        label: "Artisan Communities",
      },
    },
    {
      id: "7a7dbca6",
      data: {
        label: "Local Communities",
      },
    },
    {
      id: "162df72e",
      data: {
        label: "Emerging Economies",
      },
    },
    {
      id: "c3a7fd8a",
      data: {
        label: "US Congressional Midterms",
      },
    },
    {
      id: "96666130",
      data: {
        label: "US Small Businesses",
      },
    },
    {
      id: "26b92d2b",
      data: {
        label: "Local Credit Unions",
      },
    },
    {
      id: "d5d35826",
      data: {
        label: "Community Banks",
      },
    },
    {
      id: "145dba48",
      data: {
        label: "Local Insurance Agencies",
      },
    },
    {
      id: "cd8dd652",
      data: {
        label: "Elderly Voters",
      },
    },
    {
      id: "65e10353",
      data: {
        label: "Retirement Communities",
      },
    },
    {
      id: "3827b646",
      data: {
        label: "Pharmaceutical Companies",
      },
    },
    {
      id: "638cfb21",
      data: {
        label: "Senior Transportation Services",
      },
    },
    {
      id: "34933e29",
      data: {
        label: "Environmental Organizations",
      },
    },
    {
      id: "5c2d37b6",
      data: {
        label: "Wildlife Conservation Groups",
      },
    },
    {
      id: "e5da718e",
      data: {
        label: "Local Livestock Producers",
      },
    },
    {
      id: "f6b50a4b",
      data: {
        label: "Indigenous Land Rights Groups",
      },
    },
    {
      id: "9b9b8a6d",
      data: {
        label: "Scientific Research Institutions",
      },
    },
    {
      id: "a9f8000e",
      data: {
        label: "Sustainable Energy Companies",
      },
    },
    {
      id: "2b602d59",
      data: {
        label: "Local Indigenous Communities",
      },
    },
    {
      id: "2c07e2d0",
      data: {
        label: "Cultural Heritage Preservation",
      },
    },
    {
      id: "f2908b7e",
      data: {
        label: "Sustainable Agriculture",
      },
    },
    {
      id: "8995a2fc",
      data: {
        label: "Fashion Industry",
      },
    },
    {
      id: "0e0081f7",
      data: {
        label: "Non-Profit Organizations",
      },
    },
    {
      id: "b95da1ab",
      data: {
        label: "Local Communities",
      },
    },
    {
      id: "7f196809",
      data: {
        label: "Local Arts Scene",
      },
    },
    {
      id: "90b8e530",
      data: {
        label: "Regional Tourism",
      },
    },
    {
      id: "983cd2e8",
      data: {
        label: "Cruise Line Industry",
      },
    },
    {
      id: "26e49aad",
      data: {
        label: "Local Artisan Communities",
      },
    },
    {
      id: "762cf5b1",
      data: {
        label: "Rural Development Agencies",
      },
    },
    {
      id: "9dd26200",
      data: {
        label: "Artisan Businesses",
      },
    },
    {
      id: "33ab92f3",
      data: {
        label: "Artisan Jewelry Makers",
      },
    },
    {
      id: "57b5fe12",
      data: {
        label: "Local Artisans Cooperatives",
      },
    },
    {
      id: "27b9d073",
      data: {
        label: "Community Cultural Centers",
      },
    },
    {
      id: "0f13eb52",
      data: {
        label: "Local Businesses",
      },
    },
    {
      id: "a15b1cfc",
      data: {
        label: "Art Galleries",
      },
    },
    {
      id: "187484fa",
      data: {
        label: "Tourism Agencies",
      },
    },
    {
      id: "a4717e47",
      data: {
        label: "Underserved Populations",
      },
    },
    {
      id: "81721621",
      data: {
        label: "Craft Beer Industry",
      },
    },
    {
      id: "0df8b172",
      data: {
        label: "Farmers",
      },
    },
    {
      id: "8523dd50",
      data: {
        label: "Local Breweries",
      },
    },
    {
      id: "35ac7f1a",
      data: {
        label: "Glass Manufacturers",
      },
    },
    {
      id: "dc18d7ec",
      data: {
        label: "Comic Book Publishers",
      },
    },
    {
      id: "2f7aa466",
      data: {
        label: "Indie Film Production",
      },
    },
    {
      id: "7b28c936",
      data: {
        label: "Independent filmmakers",
      },
    },
    {
      id: "4b2d61b4",
      data: {
        label: "Local film festivals",
      },
    },
    {
      id: "0c610c5c",
      data: {
        label: "Streaming platforms",
      },
    },
    {
      id: "0312df48",
      data: {
        label: "Global Health Initiatives",
      },
    },
    {
      id: "efb8e979",
      data: {
        label: "Insurance Companies",
      },
    },
    {
      id: "76f0bd77",
      data: {
        label: "Food and Beverage Industry",
      },
    },
    {
      id: "1a18a633",
      data: {
        label: "Faith-Based Organizations",
      },
    },
    {
      id: "aec65fae",
      data: {
        label: "Women's Empowerment Organizations",
      },
    },
    {
      id: "d24f6b86",
      data: {
        label: "Small Farmers",
      },
    },
    {
      id: "4e1bb193",
      data: {
        label: "Local Cuisine",
      },
    },
    {
      id: "b13c111c",
      data: {
        label: "Regional Tourism",
      },
    },
    {
      id: "4c72ce4c",
      data: {
        label: "Craft Beverage Industry",
      },
    },
    {
      id: "18fdef90",
      data: {
        label: "Local Artisans",
      },
    },
    {
      id: "248870e8",
      data: {
        label: "Regional Music Venues",
      },
    },
    {
      id: "79aaf975",
      data: {
        label: "Independent Bookstores",
      },
    },
    {
      id: "3c359400",
      data: {
        label: "State and Local Governments",
      },
    },
    {
      id: "a9256caf",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "a23b8439",
      data: {
        label: "Local Artisans",
      },
    },
    {
      id: "40c5d10d",
      data: {
        label: "Rural Economies",
      },
    },
    {
      id: "eee47776",
      data: {
        label: "Intangible Cultural Heritage",
      },
    },
    {
      id: "8b2cec05",
      data: {
        label: "Sustainable Practices",
      },
    },
    {
      id: "ba4ef4f1",
      data: {
        label: "Women Entrepreneurs",
      },
    },
    {
      id: "39fc21a2",
      data: {
        label: "Urban Farmers",
      },
    },
    {
      id: "8f08abbf",
      data: {
        label: "Local Food Pantries",
      },
    },
    {
      id: "4265c08e",
      data: {
        label: "City Planning Departments",
      },
    },
    {
      id: "23f332d4",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "aca6270a",
      data: {
        label: "Local Farmers",
      },
    },
    {
      id: "56dd8110",
      data: {
        label: "Community Banks",
      },
    },
    {
      id: "98ee4b80",
      data: {
        label: "Community Health Centers",
      },
    },
    {
      id: "80602bc4",
      data: {
        label: "Infrastructure Projects",
      },
    },
    {
      id: "2501459d",
      data: {
        label: "Construction Unions",
      },
    },
    {
      id: "13553100",
      data: {
        label: "Amazon Web Services",
      },
    },
    {
      id: "532bb544",
      data: {
        label: "Microsoft Corporation",
      },
    },
    {
      id: "d302d857",
      data: {
        label: "Airbnb Inc.",
      },
    },
    {
      id: "e93e5a33",
      data: {
        label: "Airline Industry",
      },
    },
    {
      id: "f08d384d",
      data: {
        label: "Travel Insurance Companies",
      },
    },
    {
      id: "61c2d21f",
      data: {
        label: "Event Planning Companies",
      },
    },
    {
      id: "7ce61be3",
      data: {
        label: "Airline Suppliers",
      },
    },
    {
      id: "4dce82a1",
      data: {
        label: "Rural Communities",
      },
    },
    {
      id: "79f55c35",
      data: {
        label: "Rural Healthcare Providers",
      },
    },
    {
      id: "c362809b",
      data: {
        label: "Community Radio Stations",
      },
    },
    {
      id: "d49f73ce",
      data: {
        label: "Local Cooperatives",
      },
    },
    {
      id: "f0683653",
      data: {
        label: "Local Education",
      },
    },
    {
      id: "1b8e6e78",
      data: {
        label: "Workforce",
      },
    },
    {
      id: "79f40f7b",
      data: {
        label: "Real Estate",
      },
    },
    {
      id: "6ed516ab",
      data: {
        label: "Local Businesses",
      },
    },
    {
      id: "12e088d2",
      data: {
        label: "Private Military Contractors",
      },
    },
    {
      id: "7375f7a8",
      data: {
        label: "Foreign Governments",
      },
    },
    {
      id: "9a702eea",
      data: {
        label: "Cryptocurrency Market",
      },
    },
    {
      id: "f733730b",
      data: {
        label: "Silicon Valley tech companies",
      },
    },
    {
      id: "751f415d",
      data: {
        label: "Online retailers",
      },
    },
    {
      id: "731976bd",
      data: {
        label: "Developing countries' economies",
      },
    },
    {
      id: "59c143b1",
      data: {
        label: "Global Commodity Prices",
      },
    },
    {
      id: "99286657",
      data: {
        label: "International Aid Organizations",
      },
    },
    {
      id: "09b6e50c",
      data: {
        label: "Foreign Investment Banks",
      },
    },
    {
      id: "f5fd7731",
      data: {
        label: "Cloud Service Providers",
      },
    },
    {
      id: "93f502e0",
      data: {
        label: "Foreign Investment Banks",
      },
    },
    {
      id: "f6657ccf",
      data: {
        label: "Corporate Assets",
      },
    },
    {
      id: "16c79e96",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "b882b72b",
      data: {
        label: "High-End Fashion Designers",
      },
    },
    {
      id: "01a63469",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "b320021a",
      data: {
        label: "Private Space Companies",
      },
    },
    {
      id: "5f512fef",
      data: {
        label: "Cryptocurrency Exchanges",
      },
    },
    {
      id: "4279a4fd",
      data: {
        label: "Upscale Department Stores",
      },
    },
    {
      id: "3c00c104",
      data: {
        label: "High-End Fashion Designers",
      },
    },
    {
      id: "5255ec26",
      data: {
        label: "Luxury Car Dealerships",
      },
    },
    {
      id: "026a4f4e",
      data: {
        label: "Exclusive Travel Agencies",
      },
    },
    {
      id: "8a2ad59e",
      data: {
        label: "Wealthy Individual Consumers",
      },
    },
    {
      id: "792c5b2c",
      data: {
        label: "Private Space Companies",
      },
    },
    {
      id: "1da70f68",
      data: {
        label: "Nanotechnology Research",
      },
    },
    {
      id: "699aa55d",
      data: {
        label: "Telecommunications Firms",
      },
    },
    {
      id: "7ad710e6",
      data: {
        label: "Geospatial Mapping Companies",
      },
    },
    {
      id: "021974ab",
      data: {
        label: "Indigenous Communities",
      },
    },
    {
      id: "7a17cc2f",
      data: {
        label: "Artisan Businesses",
      },
    },
    {
      id: "5fecc92f",
      data: {
        label: "Local Transportation Services",
      },
    },
    {
      id: "cc3f97d8",
      data: {
        label: "Cryptocurrency Exchanges",
      },
    },
    {
      id: "36bae97c",
      data: {
        label: "International Law",
      },
    },
    {
      id: "6e52609d",
      data: {
        label: "International Criminal Court",
      },
    },
    {
      id: "429df1ef",
      data: {
        label: "Global Non-Governmental Organizations",
      },
    },
    {
      id: "5a65b435",
      data: {
        label: "Pension Funds",
      },
    },
    {
      id: "084fbc7e",
      data: {
        label: "African Development Bank",
      },
    },
    {
      id: "3c92e22c",
      data: {
        label: "Global Shipping Industry",
      },
    },
    {
      id: "b65f9c44",
      data: {
        label: "Democratic Party",
      },
    },
    {
      id: "f2f19d6f",
      data: {
        label: "Federal regulations",
      },
    },
    {
      id: "cd77d1cb",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "6e602d2a",
      data: {
        label: "Local Banks",
      },
    },
    {
      id: "ea403270",
      data: {
        label: "Real Estate Sector",
      },
    },
    {
      id: "5fde8c93",
      data: {
        label: "Insurance Providers",
      },
    },
    {
      id: "fae93b38",
      data: {
        label: "Global Reinsurance Market",
      },
    },
    {
      id: "c40c4820",
      data: {
        label: "Global Insurance Premiums",
      },
    },
    {
      id: "0216727d",
      data: {
        label: "Offshore Financial Centers",
      },
    },
    {
      id: "77a37754",
      data: {
        label: "International Reinsurance Brokers",
      },
    },
    {
      id: "6b0783e3",
      data: {
        label: "Catastrophe Modeling Firms",
      },
    },
    {
      id: "49fa86a4",
      data: {
        label: "International Aid Agencies",
      },
    },
    {
      id: "6f91c176",
      data: {
        label: "Kenyans Coffee Farmers",
      },
    },
    {
      id: "819f6e64",
      data: {
        label: "Sri Lankan Tea Industry",
      },
    },
    {
      id: "eec2301b",
      data: {
        label: "Russian Tourism Industry",
      },
    },
    {
      id: "3fff5641",
      data: {
        label: "Environmental Organizations",
      },
    },
    {
      id: "9b41c1c2",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "cdbc6d18",
      data: {
        label: "Sri Lankan Tea Industry",
      },
    },
    {
      id: "a956388f",
      data: {
        label: "Indian IT Sector",
      },
    },
    {
      id: "f4304490",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "e1e6f59c",
      data: {
        label: "Food Supply Chains",
      },
    },
    {
      id: "24e79dee",
      data: {
        label: "Food Retailers",
      },
    },
    {
      id: "bd5a8f5a",
      data: {
        label: "Farmers Markets",
      },
    },
    {
      id: "c2392929",
      data: {
        label: "Local Restaurants",
      },
    },
    {
      id: "eff0e0e1",
      data: {
        label: "Food Bloggers",
      },
    },
    {
      id: "3da6a17e",
      data: {
        label: "Local Farmers",
      },
    },
    {
      id: "3aec8048",
      data: {
        label: "Food Delivery Services",
      },
    },
    {
      id: "f642deca",
      data: {
        label: "Transportation Sector",
      },
    },
    {
      id: "1eea4a99",
      data: {
        label: "Logistics Companies",
      },
    },
    {
      id: "4f4b7270",
      data: {
        label: "Online Retailers",
      },
    },
    {
      id: "766eca91",
      data: {
        label: "E-commerce Platforms",
      },
    },
    {
      id: "0581cad4",
      data: {
        label: "Automotive Industry",
      },
    },
    {
      id: "c5c8d06b",
      data: {
        label: "Automotive Industry",
      },
    },
    {
      id: "9fd6882e",
      data: {
        label: "Dealership Owners",
      },
    },
    {
      id: "dab7b732",
      data: {
        label: "Car Rental Companies",
      },
    },
    {
      id: "a1cc7e40",
      data: {
        label: "Tire Manufacturers",
      },
    },
    {
      id: "555ebb24",
      data: {
        label: "Aviation Industry",
      },
    },
    {
      id: "16871dbe",
      data: {
        label: "State Governments",
      },
    },
    {
      id: "bee8eb93",
      data: {
        label: "Local Banks",
      },
    },
    {
      id: "1daa8461",
      data: {
        label: "Cooperatives",
      },
    },
    {
      id: "62218095",
      data: {
        label: "Credit Unions",
      },
    },
    {
      id: "78c8c014",
      data: {
        label: "Microfinance Institutions",
      },
    },
    {
      id: "f3a37dc7",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "14e309ae",
      data: {
        label: "Sri Lankan Tea Industry",
      },
    },
    {
      id: "01bbd33d",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "e6bbac6e",
      data: {
        label: "European Banks",
      },
    },
    {
      id: "aedfc6f6",
      data: {
        label: "Agricultural Sector",
      },
    },
    {
      id: "016eac41",
      data: {
        label: "Healthcare industry",
      },
    },
    {
      id: "3c811f72",
      data: {
        label: "Insurance Companies (non-healthcare)",
      },
    },
    {
      id: "65725845",
      data: {
        label: "Food Retailers",
      },
    },
    {
      id: "8e9ea6ba",
      data: {
        label: "Farmers Markets",
      },
    },
    {
      id: "6903f4a5",
      data: {
        label: "Banking and Finance",
      },
    },
    {
      id: "c89cc530",
      data: {
        label: "Global Commodity Prices",
      },
    },
    {
      id: "69f061ba",
      data: {
        label: "Small Farmers",
      },
    },
    {
      id: "21e215d6",
      data: {
        label: "International Aid Organizations",
      },
    },
    {
      id: "ff65edd9",
      data: {
        label: "Pharmaceutical Research",
      },
    },
    {
      id: "30c8fb60",
      data: {
        label: "Biotech Companies",
      },
    },
    {
      id: "621cc847",
      data: {
        label: "Generic Medicine Manufacturers",
      },
    },
    {
      id: "162d1220",
      data: {
        label: "Medical Device Developers",
      },
    },
    {
      id: "f8295de4",
      data: {
        label: "Minority communities",
      },
    },
    {
      id: "5e6b76be",
      data: {
        label: "Tech Companies",
      },
    },
    {
      id: "b2c6b200",
      data: {
        label: "Entertainment Industry",
      },
    },
    {
      id: "519ce2ab",
      data: {
        label: "Transportation",
      },
    },
    {
      id: "e74149af",
      data: {
        label: "Agriculture",
      },
    },
    {
      id: "487ff84e",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "7e4a97a4",
      data: {
        label: "Small Farmers",
      },
    },
    {
      id: "66e8de14",
      data: {
        label: "Rural Cooperatives",
      },
    },
    {
      id: "d33ddbd3",
      data: {
        label: "Farm Equipment Manufacturers",
      },
    },
    {
      id: "7ba296e4",
      data: {
        label: "Local Food Banks",
      },
    },
    {
      id: "4e3acfca",
      data: {
        label: "Craft Artisans",
      },
    },
    {
      id: "0ce9709c",
      data: {
        label: "Local Non-Profits",
      },
    },
    {
      id: "9473869a",
      data: {
        label: "National Science Foundation",
      },
    },
    {
      id: "4b52603a",
      data: {
        label: "Local Food Banks",
      },
    },
    {
      id: "4fbf097b",
      data: {
        label: "Community Sports Leagues",
      },
    },
    {
      id: "f3e7d044",
      data: {
        label: "Regional Music Venues",
      },
    },
    {
      id: "85ee9c83",
      data: {
        label: "Family-Owned Restaurants",
      },
    },
    {
      id: "9b6b9f13",
      data: {
        label: "Independent Bookstores",
      },
    },
    {
      id: "494bd1f5",
      data: {
        label: "Publishing Industry",
      },
    },
    {
      id: "d9c522a5",
      data: {
        label: "Literary Festivals",
      },
    },
    {
      id: "5e573ca9",
      data: {
        label: "Book Clubs",
      },
    },
    {
      id: "d3f22710",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "086ed4f1",
      data: {
        label: "Airbnb Inc.",
      },
    },
    {
      id: "37425d47",
      data: {
        label: "Indonesian Coffee Exports",
      },
    },
    {
      id: "0cf9ae3a",
      data: {
        label: "Indonesian Farmers",
      },
    },
    {
      id: "44360069",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "1e8c8915",
      data: {
        label: "Middle Eastern Investors",
      },
    },
    {
      id: "f980e12f",
      data: {
        label: "Canadian Indie Film Industry",
      },
    },
    {
      id: "77121246",
      data: {
        label: "Bangladeshi Textile Industry",
      },
    },
    {
      id: "55a48508",
      data: {
        label: "Turkish Cotton Producers",
      },
    },
    {
      id: "20be36ea",
      data: {
        label: "Vietnamese Garment Workers",
      },
    },
    {
      id: "a66f5829",
      data: {
        label: "Pakistani Leather Industry",
      },
    },
    {
      id: "8b3611bb",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "7fbc7ada",
      data: {
        label: "Gulf Cooperation Council (GCC)",
      },
    },
    {
      id: "2fa343db",
      data: {
        label: "Saudi Arabian Oil Industry",
      },
    },
    {
      id: "ad9b0801",
      data: {
        label: "UAE Real Estate Market",
      },
    },
    {
      id: "62f0d2cc",
      data: {
        label: "Qatari Banking Sector",
      },
    },
    {
      id: "1078d545",
      data: {
        label: "Middle Eastern airlines",
      },
    },
    {
      id: "1a1fefb9",
      data: {
        label: "European Banks",
      },
    },
    {
      id: "9d147308",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "7f285341",
      data: {
        label: "Airbnb Inc.",
      },
    },
    {
      id: "bae54fa3",
      data: {
        label: "Qatari economy",
      },
    },
    {
      id: "36b3baa5",
      data: {
        label: "Qatari Financial Services",
      },
    },
    {
      id: "5e5f1c22",
      data: {
        label: "Middle Eastern Jewelry Trade",
      },
    },
    {
      id: "b4fbe3bb",
      data: {
        label: "Doha International Airport",
      },
    },
    {
      id: "c9b6a159",
      data: {
        label: "Expedia Group",
      },
    },
    {
      id: "610bea20",
      data: {
        label: "International Relations",
      },
    },
    {
      id: "ca6bc001",
      data: {
        label: "United Nations",
      },
    },
    {
      id: "2ac189cc",
      data: {
        label: "Global Tourism Industry",
      },
    },
    {
      id: "2c5d9399",
      data: {
        label: "Local Artisans",
      },
    },
    {
      id: "0f1150c9",
      data: {
        label: "Hotel Chains",
      },
    },
    {
      id: "e2696f80",
      data: {
        label: "Cultural Festivals",
      },
    },
    {
      id: "cf92ad20",
      data: {
        label: "Multinational Corporations",
      },
    },
    {
      id: "00ecc449",
      data: {
        label: "Global Art and Cultural Heritage",
      },
    },
    {
      id: "8dea3a42",
      data: {
        label: "Museum of Modern Art",
      },
    },
    {
      id: "74eaa3c5",
      data: {
        label: "New York City Hotels",
      },
    },
    {
      id: "54fe18e9",
      data: {
        label: "New York City Restaurants",
      },
    },
    {
      id: "0ceb61fa",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "6ca1935b",
      data: {
        label: "Qatari Economy",
      },
    },
    {
      id: "8349af17",
      data: {
        label: "Local Artisan Communities",
      },
    },
    {
      id: "b400af09",
      data: {
        label: "Artists and Artisans",
      },
    },
    {
      id: "04c0fc95",
      data: {
        label: "Craft Brewing Industry",
      },
    },
    {
      id: "190803d1",
      data: {
        label: "Heritage Conservation Societies",
      },
    },
    {
      id: "4b95a493",
      data: {
        label: "Rural Tourism Operators",
      },
    },
    {
      id: "f8965709",
      data: {
        label: "Luxury Jewelry Brands",
      },
    },
    {
      id: "935771b7",
      data: {
        label: "Indigenous Communities",
      },
    },
    {
      id: "0453e038",
      data: {
        label: "Global Military Alliances",
      },
    },
    {
      id: "6524ec7b",
      data: {
        label: "European Defense Industry",
      },
    },
    {
      id: "e9e03151",
      data: {
        label: "Cybersecurity Firms",
      },
    },
    {
      id: "17b9f582",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "65955146",
      data: {
        label: "Global Supply Chains",
      },
    },
    {
      id: "aaf46eb2",
      data: {
        label: "Local Governments",
      },
    },
    {
      id: "505c1512",
      data: {
        label: "Global Shipping Companies",
      },
    },
    {
      id: "112d2eb2",
      data: {
        label: "European Union",
      },
    },
    {
      id: "5b70129b",
      data: {
        label: "European Banks",
      },
    },
    {
      id: "bd1fdd46",
      data: {
        label: "German Small Businesses",
      },
    },
    {
      id: "2dddf59e",
      data: {
        label: "Swiss Tourism Industry",
      },
    },
    {
      id: "0f10c399",
      data: {
        label: "Danish Construction Industry",
      },
    },
    {
      id: "c4b38089",
      data: {
        label: "Danish Export Market",
      },
    },
    {
      id: "f877dd12",
      data: {
        label: "Global Construction Material Producers",
      },
    },
    {
      id: "cdaa2d25",
      data: {
        label: "Danish Labor Market",
      },
    },
    {
      id: "048eb847",
      data: {
        label: "Asian Global Supply Chains",
      },
    },
    {
      id: "02cde668",
      data: {
        label: "African Energy Sector",
      },
    },
    {
      id: "26c53b16",
      data: {
        label: "African economies",
      },
    },
    {
      id: "ab92ee08",
      data: {
        label: "Global energy market",
      },
    },
    {
      id: "baeea9ea",
      data: {
        label: "Renewable energy initiatives",
      },
    },
    {
      id: "9fc8d44d",
      data: {
        label: "Latin American Manufacturing",
      },
    },
    {
      id: "500b96f7",
      data: {
        label: "Latin American Labor Unions",
      },
    },
    {
      id: "79b151f6",
      data: {
        label: "Global Investment Firms",
      },
    },
    {
      id: "ee1a943e",
      data: {
        label: "Regional Trade Alliances",
      },
    },
    {
      id: "669850c0",
      data: {
        label: "Russian Technology Firms",
      },
    },
    {
      id: "d75a2447",
      data: {
        label: "Oil and Gas Companies",
      },
    },
    {
      id: "83d4a932",
      data: {
        label: "Malaysian Palm Oil Farmers",
      },
    },
    {
      id: "a8733396",
      data: {
        label: "Brazilian Beef Producers",
      },
    },
    {
      id: "779268ce",
      data: {
        label: "Global Meat Importers",
      },
    },
    {
      id: "86baccbe",
      data: {
        label: "Vegetarian Advocacy Groups",
      },
    },
    {
      id: "405a8517",
      data: {
        label: "International Environmental NGOs",
      },
    },
    {
      id: "20b54d7c",
      data: {
        label: "Indian Poultry Industry",
      },
    },
    {
      id: "9c195fc2",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "2c4bb648",
      data: {
        label: "Indian Textile Manufacturers",
      },
    },
    {
      id: "a8a32769",
      data: {
        label: "Sri Lankan Tea Industry",
      },
    },
    {
      id: "8f0979ea",
      data: {
        label: "Russian Tourism Industry",
      },
    },
    {
      id: "a4939166",
      data: {
        label: "Russian Airlines",
      },
    },
    {
      id: "52714f24",
      data: {
        label: "Moscow Hotels",
      },
    },
    {
      id: "c9053a7f",
      data: {
        label: "Russian Cultural Sites",
      },
    },
    {
      id: "ba9a5175",
      data: {
        label: "Indian Tech Startups",
      },
    },
    {
      id: "77513c3f",
      data: {
        label: "Renault Electric Vehicles",
      },
    },
    {
      id: "a3f59b62",
      data: {
        label: "German Solar Industry",
      },
    },
    {
      id: "edde635c",
      data: {
        label: "Singaporean Fintech Sector",
      },
    },
    {
      id: "4b9e9eeb",
      data: {
        label: "Brazilian Agricultural Exports",
      },
    },
    {
      id: "68dd2cb0",
      data: {
        label: "Nestle SA",
      },
    },
    {
      id: "e43b7f54",
      data: {
        label: "Indonesian Biofuel Industry",
      },
    },
    {
      id: "da3f93a0",
      data: {
        label: "Argentine Agricultural Producers",
      },
    },
    {
      id: "4373125c",
      data: {
        label: "China's Global Influence",
      },
    },
    {
      id: "8787a3f2",
      data: {
        label: "African Infrastructure Projects",
      },
    },
    {
      id: "37c5c3e3",
      data: {
        label: "Global Technology Standards",
      },
    },
    {
      id: "80e12e57",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "c9dd8263",
      data: {
        label: "Boeing Company",
      },
    },
    {
      id: "6c9d8bca",
      data: {
        label: "Dubai Economy",
      },
    },
    {
      id: "526fb667",
      data: {
        label: "Turkish Airlines",
      },
    },
    {
      id: "7ec5d562",
      data: {
        label: "Expedia Group",
      },
    },
    {
      id: "27cafa83",
      data: {
        label: "Cryptocurrency Exchanges",
      },
    },
    {
      id: "260ad8e8",
      data: {
        label: "Local Entrepreneurship in Developing Countries",
      },
    },
    {
      id: "75565fb8",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "88f86e9b",
      data: {
        label: "Amazon Inc.",
      },
    },
    {
      id: "34c99992",
      data: {
        label: "French Bakery Industry",
      },
    },
    {
      id: "7cd6a08a",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "f3e7a698",
      data: {
        label: "Thai Small Business Owners",
      },
    },
    {
      id: "d3d3bf2d",
      data: {
        label: "Mexican Artisan Communities",
      },
    },
    {
      id: "95723dd4",
      data: {
        label: "Peruvian Textile Industry",
      },
    },
    {
      id: "48e6b3b0",
      data: {
        label: "Turkish Carpet Makers",
      },
    },
    {
      id: "61740554",
      data: {
        label: "Bolivian Folk Artists",
      },
    },
    {
      id: "bf0cf11c",
      data: {
        label: "Global Migration Patterns",
      },
    },
    {
      id: "e924958e",
      data: {
        label: "Insurance Companies",
      },
    },
    {
      id: "8d3e8cc8",
      data: {
        label: "Farmers",
      },
    },
    {
      id: "0eb4c512",
      data: {
        label: "Construction Industry",
      },
    },
    {
      id: "fbea6d8f",
      data: {
        label: "Japanese Whaling Industry",
      },
    },
    {
      id: "8296d128",
      data: {
        label: "Australian Mining Industry",
      },
    },
    {
      id: "ec6157e1",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "71fae84f",
      data: {
        label: "Retirees",
      },
    },
    {
      id: "4dc7f700",
      data: {
        label: "Agricultural Labor Force",
      },
    },
    {
      id: "37b4f180",
      data: {
        label: "Farm Owners",
      },
    },
    {
      id: "769cb503",
      data: {
        label: "Rural Communities",
      },
    },
    {
      id: "a13aa3e4",
      data: {
        label: "Food Processors",
      },
    },
    {
      id: "8041f626",
      data: {
        label: "Agricultural Equipment",
      },
    },
    {
      id: "2ab2200d",
      data: {
        label: "Rural Communities",
      },
    },
    {
      id: "d57e1518",
      data: {
        label: "Rural Healthcare Providers",
      },
    },
    {
      id: "1a8a2a2a",
      data: {
        label: "Global Art and Cultural Heritage",
      },
    },
    {
      id: "0eea9919",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "19a9d1d5",
      data: {
        label: "Local Credit Unions",
      },
    },
    {
      id: "d05ea32e",
      data: {
        label: "Local Farming Cooperatives",
      },
    },
    {
      id: "68d6a93d",
      data: {
        label: "Community Radio Stations",
      },
    },
    {
      id: "26f53c0c",
      data: {
        label: "Food Processing Industry",
      },
    },
    {
      id: "c508ec76",
      data: {
        label: "Farmers",
      },
    },
    {
      id: "fdca4ca3",
      data: {
        label: "Food Exporters",
      },
    },
    {
      id: "de54984a",
      data: {
        label: "Supermarkets",
      },
    },
    {
      id: "28a4295a",
      data: {
        label: "Urban Planning Departments",
      },
    },
    {
      id: "cd8cbba8",
      data: {
        label: "African Coffee Farmers",
      },
    },
    {
      id: "a5d553bf",
      data: {
        label: "Amazon Web Services",
      },
    },
    {
      id: "22705924",
      data: {
        label: "Google's Search Algorithm",
      },
    },
    {
      id: "48860769",
      data: {
        label: "Airbnb Hosts",
      },
    },
    {
      id: "8d3444f8",
      data: {
        label: "Indian Textile Manufacturers",
      },
    },
    {
      id: "51ad0fd5",
      data: {
        label: "Australian Mining Industry",
      },
    },
    {
      id: "36f2540a",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "89a5b604",
      data: {
        label: "Middle Eastern Investors",
      },
    },
    {
      id: "c8233f31",
      data: {
        label: "Southeast Asian Street Vendors",
      },
    },
    {
      id: "f9516c9b",
      data: {
        label: "Craft Beer Industry",
      },
    },
    {
      id: "3c4e4463",
      data: {
        label: "Indie Film Production",
      },
    },
    {
      id: "06003f97",
      data: {
        label: "Local Real Estate",
      },
    },
    {
      id: "49e6c839",
      data: {
        label: "Latin American Countries",
      },
    },
    {
      id: "d396a69a",
      data: {
        label: "Agricultural Exports",
      },
    },
    {
      id: "11512094",
      data: {
        label: "Food Processing Industry",
      },
    },
    {
      id: "933503d0",
      data: {
        label: "Rural Communities",
      },
    },
    {
      id: "adf3999a",
      data: {
        label: "Microsoft Corporation",
      },
    },
    {
      id: "0b3325a4",
      data: {
        label: "African Cocoa Producers",
      },
    },
    {
      id: "fde39bd4",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "f6a11aab",
      data: {
        label: "Shipping and Logistics",
      },
    },
    {
      id: "11b01920",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "aaba4bf6",
      data: {
        label: "Thai Fishing Industry",
      },
    },
    {
      id: "6d8da00d",
      data: {
        label: "Indonesian Biofuel Industry",
      },
    },
    {
      id: "cb5b70b3",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "5d0e35ee",
      data: {
        label: "Local Transportation Services",
      },
    },
    {
      id: "927de039",
      data: {
        label: "Cultural Festivals",
      },
    },
    {
      id: "a6ae2092",
      data: {
        label: "Local Tourism Industry",
      },
    },
    {
      id: "f674a851",
      data: {
        label: "Artisanal Producers",
      },
    },
    {
      id: "eb07c4dd",
      data: {
        label: "Local Restaurants",
      },
    },
    {
      id: "1e1141a5",
      data: {
        label: "Sustainable Tourism Initiatives",
      },
    },
    {
      id: "9c695b7a",
      data: {
        label: "Financial Institutions",
      },
    },
    {
      id: "371ca143",
      data: {
        label: "Legal System",
      },
    },
    {
      id: "56d06fa6",
      data: {
        label: "Federal Agencies",
      },
    },
    {
      id: "425e1916",
      data: {
        label: "Small Businesses",
      },
    },
    {
      id: "ce19ebfd",
      data: {
        label: "Homeless Shelters",
      },
    },
    {
      id: "83239454",
      data: {
        label: "Local Service Providers",
      },
    },
    {
      id: "30902d10",
      data: {
        label: "Telecom Companies",
      },
    },
    {
      id: "6facc714",
      data: {
        label: "Food Delivery Services",
      },
    },
    {
      id: "1a1e5d44",
      data: {
        label: "Local Event Planners",
      },
    },
    {
      id: "04a6859e",
      data: {
        label: "Real Estate Prices",
      },
    },
    {
      id: "e0ec6c8d",
      data: {
        label: "Mental Health Services",
      },
    },
    {
      id: "d2aa0ce8",
      data: {
        label: "Local Artisans",
      },
    },
    {
      id: "3b50fa22",
      data: {
        label: "Community Centers",
      },
    },
    {
      id: "f350bab6",
      data: {
        label: "Local Businesses",
      },
    },
    {
      id: "0d42b27f",
      data: {
        label: "Non-Profit Organizations",
      },
    },
    {
      id: "bda9c610",
      data: {
        label: "Educational Initiatives",
      },
    },
    {
      id: "77d3cf3e",
      data: {
        label: "Environmental Groups",
      },
    },
    {
      id: "03640cdc",
      data: {
        label: "Japanese Whaling Industry",
      },
    },
    {
      id: "f51ca756",
      data: {
        label: "Japanese Fishing Equipment Manufacturers",
      },
    },
    {
      id: "9a10ab5a",
      data: {
        label: "Local Whaling Communities",
      },
    },
    {
      id: "574f407e",
      data: {
        label: "Japanese Whale Watching Industry",
      },
    },
    {
      id: "e8793f02",
      data: {
        label: "Indigenous Communities in Japan",
      },
    },
    {
      id: "6c290a7b",
      data: {
        label: "Global Ocean Conservation Efforts",
      },
    },
    {
      id: "84ea1a14",
      data: {
        label: "Global Whale Conservation Groups",
      },
    },
    {
      id: "33a86805",
      data: {
        label: "Australian Mining Industry",
      },
    },
    {
      id: "c15c42d2",
      data: {
        label: "Kenyan National Parks",
      },
    },
    {
      id: "f501cd94",
      data: {
        label: "Government Contractors",
      },
    },
    {
      id: "ea8460d2",
      data: {
        label: "Russian Oligarchs",
      },
    },
    {
      id: "f2773d41",
      data: {
        label: "European Banks",
      },
    },
    {
      id: "5beadaef",
      data: {
        label: "Asian Global Supply Chains",
      },
    },
    {
      id: "4fb3e1fa",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "21c1e639",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "aed36fa0",
      data: {
        label: "High-End Fashion Designers",
      },
    },
    {
      id: "089d38a7",
      data: {
        label: "Luxury Real Estate Agents",
      },
    },
    {
      id: "2e589604",
      data: {
        label: "Exclusive Travel Agencies",
      },
    },
    {
      id: "8c360f36",
      data: {
        label: "Global Sports Leagues",
      },
    },
    {
      id: "670ce702",
      data: {
        label: "Law Enforcement",
      },
    },
    {
      id: "75870517",
      data: {
        label: "Real Estate Industry",
      },
    },
    {
      id: "a52352ec",
      data: {
        label: "Non-Profit Organizations",
      },
    },
    {
      id: "2955047f",
      data: {
        label: "Global Art Market",
      },
    },
    {
      id: "883fea52",
      data: {
        label: "Insurance Companies (art-specific)",
      },
    },
    {
      id: "ea0dbe8a",
      data: {
        label: "Art Conservation Services",
      },
    },
    {
      id: "a20e2919",
      data: {
        label: "Online Art Marketplaces",
      },
    },
    {
      id: "ca52bae5",
      data: {
        label: "Luxury Goods Industry",
      },
    },
    {
      id: "5eec396e",
      data: {
        label: "Prestigious Universities",
      },
    },
    {
      id: "1807b68b",
      data: {
        label: "Philanthropic Foundations",
      },
    },
    {
      id: "9a854eff",
      data: {
        label: "International Students",
      },
    },
    {
      id: "fe5f5ed7",
      data: {
        label: "Technology Transfer Programs",
      },
    },
    {
      id: "13314cab",
      data: {
        label: "Private Security Firms",
      },
    },
    {
      id: "405873a6",
      data: {
        label: "Agricultural Producers",
      },
    },
    {
      id: "3a93ca5a",
      data: {
        label: "Cultural Heritage Sites",
      },
    },
    {
      id: "ff583cd3",
      data: {
        label: "National Park Services",
      },
    },
    {
      id: "96c6444a",
      data: {
        label: "Local Art Dealers",
      },
    },
    {
      id: "a75b79b8",
      data: {
        label: "Cultural Exchange Programs",
      },
    },
    {
      id: "1549985e",
      data: {
        label: "Remote Workforce",
      },
    },
    {
      id: "d8245512",
      data: {
        label: "Luxury Jewelry Brands",
      },
    },
    {
      id: "60ea81df",
      data: {
        label: "Artisan Businesses",
      },
    },
    {
      id: "2cb373e4",
      data: {
        label: "Historical Landmark Preservation",
      },
    },
    {
      id: "2e17687f",
      data: {
        label: "Supreme Court",
      },
    },
    {
      id: "d6e56923",
      data: {
        label: "Gun Manufacturers",
      },
    },
    {
      id: "ae64d0c2",
      data: {
        label: "Art Galleries",
      },
    },
    {
      id: "3595a854",
      data: {
        label: "Theme Parks",
      },
    },
    {
      id: "18fe0f23",
      data: {
        label: "Sports Teams",
      },
    },
    {
      id: "e7570d8b",
      data: {
        label: "Craft Beer Industry",
      },
    },
    {
      id: "a6cbed6f",
      data: {
        label: "Independent Bookstores",
      },
    },
    {
      id: "e5e0908f",
      data: {
        label: "Local Artisan Businesses",
      },
    },
    {
      id: "68de0bc2",
      data: {
        label: "Hotels and Motels",
      },
    },
    {
      id: "a16d4aa8",
      data: {
        label: "Restaurants and Bars",
      },
    },
    {
      id: "10a054d5",
      data: {
        label: "Film and TV Productions",
      },
    },
    {
      id: "bd4245fc",
      data: {
        label: "Theater Companies",
      },
    },
    {
      id: "fd5d9352",
      data: {
        label: "Russian Oligarchs",
      },
    },
    {
      id: "55d7478a",
      data: {
        label: "Middle Eastern Investors",
      },
    },
    {
      id: "680dd544",
      data: {
        label: "South Korean Entertainment Industry",
      },
    },
    {
      id: "5a7914c1",
      data: {
        label: "Immigration Agencies",
      },
    },
    {
      id: "027e55ae",
      data: {
        label: "Tech Startups",
      },
    },
    {
      id: "20318b3d",
      data: {
        label: "Real Estate Market",
      },
    },
    {
      id: "107a4fd1",
      data: {
        label: "Global Supply Chains",
      },
    },
    {
      id: "09d29e14",
      data: {
        label: "Global Tourism Industry",
      },
    },
    {
      id: "17d4c87b",
      data: {
        label: "Multinational Corporations",
      },
    },
    {
      id: "41223622",
      data: {
        label: "Local Small Businesses",
      },
    },
    {
      id: "88c6b1b8",
      data: {
        label: "Environmental Organizations",
      },
    },
    {
      id: "9432dd71",
      data: {
        label: "Energy Companies",
      },
    },
    {
      id: "51c51a0e",
      data: {
        label: "Agricultural Corporations",
      },
    },
    {
      id: "012ec649",
      data: {
        label: "Transportation Systems",
      },
    },
    {
      id: "ce2c4a18",
      data: {
        label: "Business Owners",
      },
    },
    {
      id: "616aeb39",
      data: {
        label: "Franchise Industry",
      },
    },
    {
      id: "010c4239",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "205dc6b9",
      data: {
        label: "Conservation Efforts",
      },
    },
    {
      id: "f7b96d6b",
      data: {
        label: "Special Interest Groups",
      },
    },
    {
      id: "a32d8ef3",
      data: {
        label: "Women Entrepreneurs",
      },
    },
    {
      id: "30eb92d2",
      data: {
        label: "Global Art and Cultural Heritage",
      },
    },
    {
      id: "cd09c387",
      data: {
        label: "Food Supply Chains",
      },
    },
    {
      id: "33c1f890",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "5bfe6114",
      data: {
        label: "Credit Unions",
      },
    },
    {
      id: "e7787dfc",
      data: {
        label: "National Banking System",
      },
    },
    {
      id: "f1434652",
      data: {
        label: "Rural Cooperatives",
      },
    },
    {
      id: "9e983e51",
      data: {
        label: "Community Development Banks",
      },
    },
    {
      id: "06b89fc4",
      data: {
        label: "Educational Institutions",
      },
    },
    {
      id: "5db4f67a",
      data: {
        label: "Venezuela's Petro Oil",
      },
    },
    {
      id: "999995f3",
      data: {
        label: "Saudi Arabia's Royal Family",
      },
    },
    {
      id: "a14e055d",
      data: {
        label: "Piraeus Bank",
      },
    },
    {
      id: "1ddccbf2",
      data: {
        label: "Piraeus Bank",
      },
    },
    {
      id: "dfcdefa6",
      data: {
        label: "Greece",
      },
    },
    {
      id: "7b4573e2",
      data: {
        label: "European Union",
      },
    },
    {
      id: "b57b29c3",
      data: {
        label: "Total SA",
      },
    },
    {
      id: "7927a06e",
      data: {
        label: "Airbus SE",
      },
    },
    {
      id: "9e7dabce",
      data: {
        label: "Brazilian Coffee Farmers",
      },
    },
    {
      id: "ca3f541e",
      data: {
        label: "Russian Oligarchs",
      },
    },
    {
      id: "ded262e3",
      data: {
        label: "African Cocoa Producers",
      },
    },
    {
      id: "950d01c2",
      data: {
        label: "Middle Eastern Investors",
      },
    },
    {
      id: "915ea5f0",
      data: {
        label: "Public Opinion",
      },
    },
    {
      id: "637ea5af",
      data: {
        label: "Social Media Platforms",
      },
    },
    {
      id: "7fd5a683",
      data: {
        label: "Mental Health Organizations",
      },
    },
    {
      id: "e562e533",
      data: {
        label: "Local Tourism Boards",
      },
    },
    {
      id: "9e8b6c23",
      data: {
        label: "Family Finances",
      },
    },
    {
      id: "718760f9",
      data: {
        label: "Local Artists",
      },
    },
    {
      id: "6eb08bc0",
      data: {
        label: "Cybersecurity Companies",
      },
    },
    {
      id: "c1f5a776",
      data: {
        label: "Cryptocurrency Exchanges",
      },
    },
    {
      id: "319d476c",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "1b402ed9",
      data: {
        label: "Global Food Prices",
      },
    },
    {
      id: "792d605e",
      data: {
        label: "Educational Institutions",
      },
    },
    {
      id: "e2a08b94",
      data: {
        label: "Psychological Counseling Services",
      },
    },
    {
      id: "6c7cf5bc",
      data: {
        label: "Local School Boards",
      },
    },
    {
      id: "95541b73",
      data: {
        label: "Parent-Teacher Associations",
      },
    },
    {
      id: "005a780e",
      data: {
        label: "Civil Society Organizations",
      },
    },
    {
      id: "07cf724a",
      data: {
        label: "Small Business Owners",
      },
    },
    {
      id: "3b90558f",
      data: {
        label: "Local Banks",
      },
    },
    {
      id: "9b2ead63",
      data: {
        label: "Agricultural Cooperatives",
      },
    },
    {
      id: "3cbbc857",
      data: {
        label: "Craft Wineries",
      },
    },
    {
      id: "9fcf0dd9",
      data: {
        label: "Local Museums",
      },
    },
    {
      id: "78b6ef40",
      data: {
        label: "Local Real Estate",
      },
    },
    {
      id: "78af33fc",
      data: {
        label: "Credit Unions",
      },
    },
    {
      id: "7aa53786",
      data: {
        label: "Home Builders",
      },
    },
    {
      id: "eb258447",
      data: {
        label: "Local Banks",
      },
    },
    {
      id: "8432e977",
      data: {
        label: "Local Businesses",
      },
    },
    {
      id: "45f1fa81",
      data: {
        label: "Community Development",
      },
    },
    {
      id: "4b41128d",
      data: {
        label: "Community Development",
      },
    },
    {
      id: "3a0b1c96",
      data: {
        label: "Rural Healthcare Facilities",
      },
    },
    {
      id: "4ec555be",
      data: {
        label: "Public Transportation",
      },
    },
    {
      id: "bcad7206",
      data: {
        label: "Youth Employment Programs",
      },
    },
    {
      id: "a486662d",
      data: {
        label: "Local Governments",
      },
    },
    {
      id: "2a7cd29f",
      data: {
        label: "Global Commodity Traders",
      },
    },
    {
      id: "4c69a654",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "e2cc1813",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "ea53e777",
      data: {
        label: "Expedia Group",
      },
    },
    {
      id: "88a0cb6b",
      data: {
        label: "Airbnb Inc.",
      },
    },
    {
      id: "82115afa",
      data: {
        label: "Hotel Chains",
      },
    },
    {
      id: "1dd396cc",
      data: {
        label: "Luxury Goods Manufacturers",
      },
    },
    {
      id: "bda8b8a9",
      data: {
        label: "Private Space Companies",
      },
    },
    {
      id: "59632d96",
      data: {
        label: "Cryptocurrency Exchanges",
      },
    },
    {
      id: "152d6478",
      data: {
        label: "Fossil Fuel Industry",
      },
    },
    {
      id: "f165293f",
      data: {
        label: "Renewable Energy Sector",
      },
    },
    {
      id: "01083c6a",
      data: {
        label: "Local Banks",
      },
    },
    {
      id: "69e7c6b6",
      data: {
        label: "Local Real Estate",
      },
    },
    {
      id: "0a89f103",
      data: {
        label: "Special Interest Groups",
      },
    },
    {
      id: "520f3b30",
      data: {
        label: "Business Associations",
      },
    },
    {
      id: "25605eb5",
      data: {
        label: "International Development Banks",
      },
    },
    {
      id: "189c1787",
      data: {
        label: "Global Shipping Industry",
      },
    },
    {
      id: "4d8e18da",
      data: {
        label: "African Coffee Farmers",
      },
    },
    {
      id: "4d4fbaa0",
      data: {
        label: "Immigrant Communities",
      },
    },
    {
      id: "31905195",
      data: {
        label: "Coffee Industry",
      },
    },
    {
      id: "f0a6f583",
      data: {
        label: "Nestle Corporation",
      },
    },
    {
      id: "8bac3831",
      data: {
        label: "Ethiopian Farmers",
      },
    },
    {
      id: "ad7c3d4e",
      data: {
        label: "Swiss Chocolate Makers",
      },
    },
    {
      id: "fe8eeb59",
      data: {
        label: "Art and Culture",
      },
    },
    {
      id: "f7299a74",
      data: {
        label: "Korean Film Industry",
      },
    },
    {
      id: "91a97cbf",
      data: {
        label: "Brazilian Carnival",
      },
    },
    {
      id: "b4dea3a9",
      data: {
        label: "Peruvian Textile Industry",
      },
    },
    {
      id: "b2bf787c",
      data: {
        label: "Portuguese Language Schools",
      },
    },
    {
      id: "2d244cb5",
      data: {
        label: "Uruguayan Music Festivals",
      },
    },
    {
      id: "565b935b",
      data: {
        label: "African Fashion Industry",
      },
    },
    {
      id: "a45f826b",
      data: {
        label: "Food Service Industry",
      },
    },
    {
      id: "2fe0f9f3",
      data: {
        label: "Fashion Industry",
      },
    },
    {
      id: "b8f86378",
      data: {
        label: "Music and Entertainment",
      },
    },
    {
      id: "fa478b73",
      data: {
        label: "Sports Teams",
      },
    },
    {
      id: "da57c84d",
      data: {
        label: "Banking and Finance",
      },
    },
    {
      id: "178daaad",
      data: {
        label: "Pension Funds",
      },
    },
    {
      id: "890ad691",
      data: {
        label: "Islamic Banking",
      },
    },
    {
      id: "ff623572",
      data: {
        label: "Turkish Carpet Weavers",
      },
    },
    {
      id: "a8b2c791",
      data: {
        label: "Malaysian Palm Oil Farmers",
      },
    },
    {
      id: "e3980122",
      data: {
        label: "Egyptian Cotton Producers",
      },
    },
    {
      id: "e35e446f",
      data: {
        label: "Microfinance Institutions",
      },
    },
    {
      id: "7e0c6e3e",
      data: {
        label: "Non-Traditional Energy Sources",
      },
    },
    {
      id: "67f9b5e7",
      data: {
        label: "Greenpeace",
      },
    },
    {
      id: "6f095ab9",
      data: {
        label: "Indigenous Energy Co-ops",
      },
    },
    {
      id: "922042a1",
      data: {
        label: "Indigenous Communities",
      },
    },
    {
      id: "87e79d4b",
      data: {
        label: "Local Indigenous Leaders",
      },
    },
    {
      id: "7c3b8eec",
      data: {
        label: "Global Environmental Organizations",
      },
    },
    {
      id: "b862bcc2",
      data: {
        label: "Rural Communities Worldwide",
      },
    },
    {
      id: "99241bbd",
      data: {
        label: "International Organizations",
      },
    },
    {
      id: "14552054",
      data: {
        label: "Environmental Groups",
      },
    },
    {
      id: "9a38b175",
      data: {
        label: "Agricultural Industry",
      },
    },
    {
      id: "5172e789",
      data: {
        label: "Ethiopian Coffee Industry",
      },
    },
    {
      id: "544fa0b0",
      data: {
        label: "Icelandic Government",
      },
    },
    {
      id: "dd00ea6b",
      data: {
        label: "Panama Canal Authority",
      },
    },
    {
      id: "0de287a4",
      data: {
        label: "Renewable Energy Companies",
      },
    },
    {
      id: "647cb665",
      data: {
        label: "Local Utility Providers",
      },
    },
    {
      id: "5400d33d",
      data: {
        label: "Manufacturing Industries",
      },
    },
    {
      id: "716613a6",
      data: {
        label: "International Development",
      },
    },
    {
      id: "05daaf16",
      data: {
        label: "Waste Management Companies",
      },
    },
    {
      id: "b936ed33",
      data: {
        label: "Educational Institutions",
      },
    },
    {
      id: "9515f756",
      data: {
        label: "Migrant Workers",
      },
    },
    {
      id: "04a00063",
      data: {
        label: "Technology Startups",
      },
    },
    {
      id: "19e8e23f",
      data: {
        label: "Agricultural Sectors",
      },
    },
    {
      id: "9cb29287",
      data: {
        label: "Australian Mining Industry",
      },
    },
    {
      id: "8d962c96",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "a28d00f7",
      data: {
        label: "Renewable Energy Sector",
      },
    },
    {
      id: "a0197c6b",
      data: {
        label: "Construction Industries",
      },
    },
    {
      id: "352ab7fc",
      data: {
        label: "Kenyan Coffee Farmers",
      },
    },
    {
      id: "92647e30",
      data: {
        label: "Qatar Airways",
      },
    },
    {
      id: "25c80631",
      data: {
        label: "Indigenous Communities",
      },
    },
    {
      id: "3f620224",
      data: {
        label: "Cultural Heritage Preservation",
      },
    },
    {
      id: "d1583ec2",
      data: {
        label: "Gemstone and Mineral Mining",
      },
    },
    {
      id: "a34291cc",
      data: {
        label: "Forestry Management",
      },
    },
    {
      id: "0508680f",
      data: {
        label: "Small Business Owners",
      },
    },
    {
      id: "2938b106",
      data: {
        label: "Real Estate Market",
      },
    },
    {
      id: "a017cfd0",
      data: {
        label: "Homeowners",
      },
    },
    {
      id: "d7affd5a",
      data: {
        label: "Commercial Property Owners",
      },
    },
    {
      id: "3d495446",
      data: {
        label: "Real Estate Agents",
      },
    },
    {
      id: "430a27b2",
      data: {
        label: "Consumer Electronics Industry",
      },
    },
    {
      id: "11011f3a",
      data: {
        label: "Artisan Craft Industry",
      },
    },
    {
      id: "f59330ed",
      data: {
        label: "Environmental Organizations",
      },
    },
    {
      id: "5caec95c",
      data: {
        label: "Fossil Fuel Industry",
      },
    },
    {
      id: "6a2479db",
      data: {
        label: "Bangladesh Textile Industry",
      },
    },
    {
      id: "870cdc3f",
      data: {
        label: "South African Mining Unions",
      },
    },
    {
      id: "20809143",
      data: {
        label: "Thai Fishing Industry",
      },
    },
    {
      id: "1400fba5",
      data: {
        label: "Renewable Energy Sector",
      },
    },
    {
      id: "2ea23e90",
      data: {
        label: "Water Treatment Plants",
      },
    },
    {
      id: "1ede33a4",
      data: {
        label: "Food Service Industry",
      },
    },
    {
      id: "365cde15",
      data: {
        label: "Craft Artisans",
      },
    },
    {
      id: "84a6806f",
      data: {
        label: "Tourism Industry",
      },
    },
    {
      id: "ac71a842",
      data: {
        label: "Fisheries Industry",
      },
    },
    {
      id: "11136b10",
      data: {
        label: "Disaster Relief Organizations",
      },
    },
    {
      id: "498daa78",
      data: {
        label: "Local Communities",
      },
    },
    {
      id: "7519448f",
      data: {
        label: "Cooperative Housing Projects",
      },
    },
    {
      id: "5625b6fc",
      data: {
        label: "Local Artisans",
      },
    },
    {
      id: "f2d2411f",
      data: {
        label: "Community Land Trusts",
      },
    },
  ],
  edges: [
    {
      id: "80a64039",
      source: "ab033a0e",
      target: "47d568f7",
      label: "Loss of political support",
    },
    {
      id: "f75f3d41",
      source: "ab033a0e",
      target: "aa0fd757",
      label: "Political uncertainty affecting investments",
    },
    {
      id: "2458d209",
      source: "ab033a0e",
      target: "d3e29d60",
      label: "Reputation damage impacting ventures",
    },
    {
      id: "fb6aeea4",
      source: "ab033a0e",
      target: "4ee99971",
      label: "Increased coverage boosting viewership",
    },
    {
      id: "63d2b5b1",
      source: "ab033a0e",
      target: "8ca56a96",
      label: "Uncertainty slowing economic growth",
    },
    {
      id: "ae226850",
      source: "ab033a0e",
      target: "de4feae3",
      label: "Stress and leadership changes",
    },
    {
      id: "5f9de549",
      source: "ab033a0e",
      target: "b65f9c44",
      label: "Potential political gain",
    },
    {
      id: "8a6652cc",
      source: "ab033a0e",
      target: "610bea20",
      label: "Strained relations with other countries",
    },
    {
      id: "bec59549",
      source: "ab033a0e",
      target: "371ca143",
      label: "Overburdened with impeachment proceedings",
    },
    {
      id: "eafae6dd",
      source: "ab033a0e",
      target: "915ea5f0",
      label: "Shifts in polls affecting elections",
    },
    {
      id: "d45158ce",
      source: "47d568f7",
      target: "597010df",
      label: "Market volatility increases.",
    },
    {
      id: "f21f1212",
      source: "47d568f7",
      target: "89c1e085",
      label: "Regulatory uncertainty rises.",
    },
    {
      id: "1ad70e3f",
      source: "47d568f7",
      target: "ae726c4b",
      label: "Political influence diminishes.",
    },
    {
      id: "adfa4a23",
      source: "aa0fd757",
      target: "b63c868b",
      label: "Market volatility affects spending",
    },
    {
      id: "e91f5d2d",
      source: "aa0fd757",
      target: "5cbfd4f2",
      label: "U.S. market instability impacts global trade",
    },
    {
      id: "59d378ad",
      source: "aa0fd757",
      target: "44082af9",
      label: "Market volatility impacts tech investments",
    },
    {
      id: "44554f4b",
      source: "d3e29d60",
      target: "d32f78ad",
      label: "Brand association changes",
    },
    {
      id: "d59955ff",
      source: "d3e29d60",
      target: "f90456c6",
      label: "Market demand fluctuation",
    },
    {
      id: "b69dc630",
      source: "d3e29d60",
      target: "ac82dcf0",
      label: "Shift in funding priorities",
    },
    {
      id: "0d918f12",
      source: "d32f78ad",
      target: "d785cfc2",
      label: "Competitive Displacement",
    },
    {
      id: "2857f5f4",
      source: "d32f78ad",
      target: "7f512e18",
      label: "Increased Demand",
    },
    {
      id: "554354b6",
      source: "d32f78ad",
      target: "c470b047",
      label: "Boosted Employment",
    },
    {
      id: "7ddb04c6",
      source: "d785cfc2",
      target: "3e1929e2",
      label: "Pollution from increased tourism.",
    },
    {
      id: "ac21b8ab",
      source: "d785cfc2",
      target: "199ef90a",
      label: "Increased demand for local crafts.",
    },
    {
      id: "005502bc",
      source: "d785cfc2",
      target: "efe89a7c",
      label: "Higher flight demand boosts revenue.",
    },
    {
      id: "cfb15bed",
      source: "c470b047",
      target: "4e7fea75",
      label: "Loss of Revenue",
    },
    {
      id: "309aa176",
      source: "c470b047",
      target: "1b67836b",
      label: "Decreased Visitors",
    },
    {
      id: "9026e327",
      source: "c470b047",
      target: "4f8beb2f",
      label: "Job Security",
    },
    {
      id: "3ba38ce4",
      source: "f90456c6",
      target: "0be56a61",
      label: "Trump memorabilia becomes collectible",
    },
    {
      id: "071d4cd6",
      source: "f90456c6",
      target: "d81cc054",
      label: "Increased demand for handmade items",
    },
    {
      id: "ca8d39f8",
      source: "f90456c6",
      target: "a768f458",
      label: "Merchandise fuels fan engagement further",
    },
    {
      id: "62684fc3",
      source: "f90456c6",
      target: "f5d34e66",
      label: "Trump-themed souvenirs become popular",
    },
    {
      id: "49b10d0a",
      source: "f90456c6",
      target: "759663fe",
      label: "Higher demand for custom merchandise",
    },
    {
      id: "7a144933",
      source: "f90456c6",
      target: "99329ecd",
      label: "New rare items become valuable",
    },
    {
      id: "688f5844",
      source: "0be56a61",
      target: "9d84a16f",
      label: "New Artistic Inspiration Sources",
    },
    {
      id: "ded1cfc7",
      source: "0be56a61",
      target: "0dac2e2d",
      label: "Increased Community Engagement Opportunities",
    },
    {
      id: "95e433cb",
      source: "0be56a61",
      target: "6a1a866a",
      label: "New Cultural Experiences Offered",
    },
    {
      id: "7c9e9ae2",
      source: "d81cc054",
      target: "b976cf27",
      label: "New funding sources",
    },
    {
      id: "d3a7d1eb",
      source: "d81cc054",
      target: "69ec74b5",
      label: "Regulatory compliance",
    },
    {
      id: "34dcc8ab",
      source: "d81cc054",
      target: "b720497e",
      label: "Cultural revival",
    },
    {
      id: "e3fdafb9",
      source: "a768f458",
      target: "a960e14c",
      label: "Increased fan engagement",
    },
    {
      id: "02b76d5f",
      source: "a768f458",
      target: "2844728a",
      label: "Inspiration from fandom trends",
    },
    {
      id: "dc261cc6",
      source: "a768f458",
      target: "d4f9cc87",
      label: "Growing demand for merchandise",
    },
    {
      id: "5fc45f4c",
      source: "759663fe",
      target: "b99add35",
      label: "Customized clothing demand increases",
    },
    {
      id: "95e8de20",
      source: "759663fe",
      target: "850b9421",
      label: "Merchandising opportunities expand",
    },
    {
      id: "4a475e7e",
      source: "759663fe",
      target: "f04d7945",
      label: "New revenue streams emerge",
    },
    {
      id: "622bb4ce",
      source: "99329ecd",
      target: "220b50a6",
      label: "Increased Demand from Collectors",
    },
    {
      id: "133d24a8",
      source: "99329ecd",
      target: "2d325e6e",
      label: "New Niche Market Emerges",
    },
    {
      id: "5d079c95",
      source: "99329ecd",
      target: "42c317f4",
      label: "Increased Value and Rarity",
    },
    {
      id: "272f6504",
      source: "220b50a6",
      target: "cdadd058",
      label: "Investment in Gold and Silver",
    },
    {
      id: "dad6fc4f",
      source: "220b50a6",
      target: "5a658348",
      label: "Increased Value of Metals",
    },
    {
      id: "510df985",
      source: "220b50a6",
      target: "51ea63d3",
      label: "Increased demand for stable stores",
    },
    {
      id: "2368d3d0",
      source: "ac82dcf0",
      target: "42dd2fa4",
      label: "Potential loss of government contracts",
    },
    {
      id: "f4f94759",
      source: "ac82dcf0",
      target: "90dbbb33",
      label: "Adverse effect on sport sponsorships",
    },
    {
      id: "534f9b7f",
      source: "ac82dcf0",
      target: "186c5e95",
      label: "Potential reduction in funding",
    },
    {
      id: "c7f66cf0",
      source: "ac82dcf0",
      target: "c8c8e430",
      label: "Potential decrease in public support",
    },
    {
      id: "22983040",
      source: "ac82dcf0",
      target: "5d744a5f",
      label: "Reduced research funding opportunities",
    },
    {
      id: "a43bced7",
      source: "ac82dcf0",
      target: "12ef7f1a",
      label: "Potential loss of government funding",
    },
    {
      id: "ef063146",
      source: "ac82dcf0",
      target: "55803fda",
      label: "Reduced access to grants",
    },
    {
      id: "31c0e338",
      source: "ac82dcf0",
      target: "9db74e07",
      label: "Potential decrease in public support",
    },
    {
      id: "4b7daa23",
      source: "90dbbb33",
      target: "d2949db5",
      label: "Rule changes affect participation.",
    },
    {
      id: "1aa8c3c7",
      source: "90dbbb33",
      target: "904c81d9",
      label: "Infrastructure projects increase.",
    },
    {
      id: "55aeb1b4",
      source: "90dbbb33",
      target: "80b557c4",
      label: "Rights deals may change.",
    },
    {
      id: "ca63b32f",
      source: "186c5e95",
      target: "09556298",
      label: "New landmark updates required",
    },
    {
      id: "e9904b9b",
      source: "186c5e95",
      target: "7f9a0fb8",
      label: "Increased preservation costs",
    },
    {
      id: "65f2fdbb",
      source: "186c5e95",
      target: "ca038474",
      label: "Restrictions on event locations",
    },
    {
      id: "333a9c82",
      source: "09556298",
      target: "84a43b2b",
      label: "Better discoverability and traffic",
    },
    {
      id: "8f51169f",
      source: "09556298",
      target: "e2094c5d",
      label: "Improved itinerary planning",
    },
    {
      id: "c3bc558e",
      source: "09556298",
      target: "6e36dfd7",
      label: "Direct customer access and location visibility",
    },
    {
      id: "bf087b5c",
      source: "6e36dfd7",
      target: "f2c432ed",
      label: "New Market",
    },
    {
      id: "0c649557",
      source: "6e36dfd7",
      target: "458ac30e",
      label: "Increased Demand",
    },
    {
      id: "3dadc28a",
      source: "6e36dfd7",
      target: "d7be3bbf",
      label: "Global Exposure",
    },
    {
      id: "f19aed5a",
      source: "5d744a5f",
      target: "4a6841d7",
      label: "Deregulation of robotics development",
    },
    {
      id: "aafe6291",
      source: "5d744a5f",
      target: "cfd34b00",
      label: "Attracting international students and faculty",
    },
    {
      id: "f4229cc1",
      source: "5d744a5f",
      target: "50c9121a",
      label: "Advancements in AI research collaborations",
    },
    {
      id: "bd7c32bf",
      source: "50c9121a",
      target: "528f5049",
      label: "Competition increase",
    },
    {
      id: "39f81838",
      source: "50c9121a",
      target: "dec1ba44",
      label: "Tech collaboration",
    },
    {
      id: "0b9925a5",
      source: "50c9121a",
      target: "d4a67763",
      label: "Digital banking",
    },
    {
      id: "40d04a76",
      source: "12ef7f1a",
      target: "2fd2587f",
      label: "Increased research visits.",
    },
    {
      id: "bf77f024",
      source: "12ef7f1a",
      target: "a8e7496a",
      label: "Enhanced archival preservation.",
    },
    {
      id: "2aa24c3a",
      source: "12ef7f1a",
      target: "648307d0",
      label: "Support for documentation.",
    },
    {
      id: "1dc08310",
      source: "a8e7496a",
      target: "7cc653ac",
      label: "Increased tourism and patronage",
    },
    {
      id: "f2d7e9b3",
      source: "a8e7496a",
      target: "271531ff",
      label: "Access to historical research",
    },
    {
      id: "d865135e",
      source: "a8e7496a",
      target: "b89a95d5",
      label: "Shared resources and advocacy",
    },
    {
      id: "5d1ccb1c",
      source: "55803fda",
      target: "e8263000",
      label: "Increased funding opportunities",
    },
    {
      id: "b7b4472d",
      source: "55803fda",
      target: "314b7d02",
      label: "Boosted loan applications",
    },
    {
      id: "b955fee9",
      source: "55803fda",
      target: "da8235e6",
      label: "Enhanced community support",
    },
    {
      id: "1fb4032b",
      source: "9db74e07",
      target: "d9d938ea",
      label: "Shift towards sustainability",
    },
    {
      id: "e1f8bd00",
      source: "9db74e07",
      target: "8e43365e",
      label: "Regulation enforcement increases",
    },
    {
      id: "0f7230ce",
      source: "9db74e07",
      target: "42d0fad4",
      label: "Investment opportunities rise",
    },
    {
      id: "99f2d4fe",
      source: "42d0fad4",
      target: "b707f750",
      label: "Access to alternative energy",
    },
    {
      id: "bba14042",
      source: "42d0fad4",
      target: "5d8e4be8",
      label: "Increased availability of sustainable",
    },
    {
      id: "c3759a74",
      source: "42d0fad4",
      target: "58d17605",
      label: "New investment opportunities emerge",
    },
    {
      id: "a85877d1",
      source: "4ee99971",
      target: "7109b53a",
      label: "Shaping National Narrative",
    },
    {
      id: "0d2b5ce3",
      source: "4ee99971",
      target: "90f9cfe9",
      label: "Increased Workload Demand",
    },
    {
      id: "2d995f82",
      source: "4ee99971",
      target: "3ec19f58",
      label: "Moderation Policy Challenges",
    },
    {
      id: "49a30d2f",
      source: "7109b53a",
      target: "4e060449",
      label: "Tourism patterns shift based on perception",
    },
    {
      id: "29712337",
      source: "7109b53a",
      target: "5436944c",
      label: "Donations influenced by public sentiment",
    },
    {
      id: "8db15b54",
      source: "4e060449",
      target: "718afb92",
      label: "Increased bookings and revenue",
    },
    {
      id: "e4537cb9",
      source: "4e060449",
      target: "5738d21f",
      label: "Rise in policy sales",
    },
    {
      id: "62836647",
      source: "4e060449",
      target: "9c7f7a2d",
      label: "Boost in room bookings",
    },
    {
      id: "a06b954d",
      source: "718afb92",
      target: "474411b0",
      label: "Reduced international travelers.",
    },
    {
      id: "53bf69a5",
      source: "718afb92",
      target: "1f931a10",
      label: "Decreased air travel leads.",
    },
    {
      id: "c61156e6",
      source: "718afb92",
      target: "b7de4940",
      label: "Fewer travel plans worldwide.",
    },
    {
      id: "eb3d281c",
      source: "5738d21f",
      target: "8e7adda4",
      label: "Increased participation due to safety nets.",
    },
    {
      id: "10cca7de",
      source: "5738d21f",
      target: "f42616e2",
      label: "More confident tourists book tours.",
    },
    {
      id: "ff517eeb",
      source: "5738d21f",
      target: "a8832521",
      label: "Higher demand for specialized trips.",
    },
    {
      id: "cc410bf7",
      source: "5436944c",
      target: "f9617147",
      label: "Increased funding competition",
    },
    {
      id: "7d769e83",
      source: "5436944c",
      target: "c3f5a1ad",
      label: "Expanded advocacy efforts",
    },
    {
      id: "e26b45df",
      source: "5436944c",
      target: "3816db44",
      label: "Potential financial support",
    },
    {
      id: "1a833800",
      source: "f9617147",
      target: "66d6fbae",
      label: "Funding for infrastructure projects",
    },
    {
      id: "6f097896",
      source: "f9617147",
      target: "807c3fc2",
      label: "Direct financial and logistical support",
    },
    {
      id: "b14f1147",
      source: "f9617147",
      target: "79314e39",
      label: "Grants for specific aid initiatives",
    },
    {
      id: "1f0a2f37",
      source: "66d6fbae",
      target: "d4cf1140",
      label: "Loss of cultural heritage",
    },
    {
      id: "5aef5223",
      source: "66d6fbae",
      target: "0277031f",
      label: "Difficulty accessing funding",
    },
    {
      id: "08af6747",
      source: "66d6fbae",
      target: "d11d8908",
      label: "Unstable market prices",
    },
    {
      id: "60f9d040",
      source: "807c3fc2",
      target: "a4e1221b",
      label: "Increased demand for aid",
    },
    {
      id: "462d5273",
      source: "807c3fc2",
      target: "971ded72",
      label: "Trauma support for refugees",
    },
    {
      id: "ffd29ba8",
      source: "807c3fc2",
      target: "03ed9606",
      label: "Aid delivery and distribution",
    },
    {
      id: "d2cad5cc",
      source: "03ed9606",
      target: "4c643c22",
      label: "Increased demand and costs",
    },
    {
      id: "8c1312d7",
      source: "03ed9606",
      target: "96749a18",
      label: "Supply chain disruptions",
    },
    {
      id: "ada97000",
      source: "03ed9606",
      target: "eab3305b",
      label: "Travel restrictions, cost changes",
    },
    {
      id: "3bb9f57c",
      source: "79314e39",
      target: "495827ab",
      label: "Global cultural interest shift",
    },
    {
      id: "363f886f",
      source: "79314e39",
      target: "c9fe3f83",
      label: "International cultural heritage focus",
    },
    {
      id: "5866284d",
      source: "79314e39",
      target: "14d7e4d1",
      label: "Fair trade practices emphasis",
    },
    {
      id: "2d37ef04",
      source: "c3f5a1ad",
      target: "1e0f8e0e",
      label: "Reputation risk from rights violations",
    },
    {
      id: "945f556a",
      source: "c3f5a1ad",
      target: "69b04b78",
      label: "Scrutiny over human rights involvement",
    },
    {
      id: "d78defcf",
      source: "c3f5a1ad",
      target: "9c19caa9",
      label: "Operational scrutiny in conflict zones",
    },
    {
      id: "742529be",
      source: "3816db44",
      target: "35d99fe7",
      label: "New Contracts",
    },
    {
      id: "f61f100a",
      source: "3816db44",
      target: "6d662d55",
      label: "Increased Loans",
    },
    {
      id: "999d11ec",
      source: "3816db44",
      target: "5395e10f",
      label: "Higher Demand",
    },
    {
      id: "69a5dce2",
      source: "35d99fe7",
      target: "f03ca80c",
      label: "Infrastructure Development Projects",
    },
    {
      id: "250a99a7",
      source: "35d99fe7",
      target: "7283ff1f",
      label: "Neighborhood Demographics Shift",
    },
    {
      id: "2a3dac00",
      source: "35d99fe7",
      target: "0092e73d",
      label: "Job Creation Opportunities",
    },
    {
      id: "7a95ef27",
      source: "90f9cfe9",
      target: "2f2675b3",
      label: "Influences electoral decisions",
    },
    {
      id: "019e118b",
      source: "90f9cfe9",
      target: "8377ab89",
      label: "Guides grant funding decisions",
    },
    {
      id: "a8d7a8b5",
      source: "90f9cfe9",
      target: "b3c3392b",
      label: "Promotes informed participation",
    },
    {
      id: "86b8ef03",
      source: "2f2675b3",
      target: "59672175",
      label: "Increased Community Engagement",
    },
    {
      id: "b3ef47de",
      source: "2f2675b3",
      target: "1b9c5d9a",
      label: "Shift in Global Credibility",
    },
    {
      id: "281f0cd8",
      source: "2f2675b3",
      target: "248a67f1",
      label: "Influence on Border Control",
    },
    {
      id: "c2ecdb49",
      source: "59672175",
      target: "70f41829",
      label: "Increased access to capital",
    },
    {
      id: "58213c79",
      source: "59672175",
      target: "f1802b01",
      label: "Improved financial inclusion options",
    },
    {
      id: "e6486108",
      source: "59672175",
      target: "a55ffa35",
      label: "Alternative lending options available",
    },
    {
      id: "2146cb40",
      source: "59672175",
      target: "f0ce2510",
      label: "Enhanced economic development opportunities",
    },
    {
      id: "dce5fac5",
      source: "59672175",
      target: "cf246607",
      label: "Access to financial services expanded",
    },
    {
      id: "034052a8",
      source: "59672175",
      target: "eebccd6a",
      label: "Increased funding and support",
    },
    {
      id: "60dc17f7",
      source: "59672175",
      target: "dbdac1db",
      label: "Improved access to resources",
    },
    {
      id: "86bc80d3",
      source: "1b9c5d9a",
      target: "58544505",
      label: "Swiss Banking System Instability",
    },
    {
      id: "2c0616d6",
      source: "1b9c5d9a",
      target: "8be3c1b7",
      label: "Swiss Banking System Disruptions",
    },
    {
      id: "2bb5e9da",
      source: "1b9c5d9a",
      target: "a9210c1d",
      label: "Swiss Banking System Sanctions",
    },
    {
      id: "a4b87026",
      source: "8377ab89",
      target: "2db73469",
      label: "Loss of cultural funding",
    },
    {
      id: "9ab66478",
      source: "8377ab89",
      target: "7df7617d",
      label: "Decreased government support",
    },
    {
      id: "b49fd360",
      source: "8377ab89",
      target: "8a06b540",
      label: "Reduced funding and resources",
    },
    {
      id: "9864e5ad",
      source: "8a06b540",
      target: "c8b72c8f",
      label: "Increased diversity",
    },
    {
      id: "ed31c553",
      source: "8a06b540",
      target: "eb972b5e",
      label: "Funding opportunities",
    },
    {
      id: "f69549cb",
      source: "8a06b540",
      target: "c59ca2cb",
      label: "Inclusive hiring",
    },
    {
      id: "85c876bc",
      source: "c8b72c8f",
      target: "6bfd1b26",
      label: "Market Dominance",
    },
    {
      id: "d9a37057",
      source: "c8b72c8f",
      target: "45a388cf",
      label: "Influential Platform",
    },
    {
      id: "b5de2a2d",
      source: "c8b72c8f",
      target: "6299aada",
      label: "Technological Leader",
    },
    {
      id: "9649ae14",
      source: "c59ca2cb",
      target: "4c89a0de",
      label: "Supply Chain Disruptions",
    },
    {
      id: "504a7f46",
      source: "c59ca2cb",
      target: "add09db7",
      label: "Furniture Rental Demands",
    },
    {
      id: "b0a3e7b8",
      source: "c59ca2cb",
      target: "7a633408",
      label: "Increased Demand Boost",
    },
    {
      id: "99610c8f",
      source: "b3c3392b",
      target: "a8d5f64c",
      label: "Increased volunteer participation",
    },
    {
      id: "89f9f308",
      source: "b3c3392b",
      target: "2d80ddd0",
      label: "Enhanced donation drives",
    },
    {
      id: "51c1891e",
      source: "b3c3392b",
      target: "0be75864",
      label: "Boosted membership and usage",
    },
    {
      id: "110685b0",
      source: "a8d5f64c",
      target: "6eb58bf9",
      label: "Increased local food production",
    },
    {
      id: "67a9c488",
      source: "a8d5f64c",
      target: "9f755d6a",
      label: "Fosters community-based entrepreneurship models",
    },
    {
      id: "286d453e",
      source: "a8d5f64c",
      target: "938a4426",
      label: "Provides therapeutic outdoor activities spaces",
    },
    {
      id: "8e83fafd",
      source: "a8d5f64c",
      target: "80a63dbd",
      label: "Community gardens protect local heritage sites",
    },
    {
      id: "146c1ee8",
      source: "a8d5f64c",
      target: "85e0b6cd",
      label: "Supports local art and cultural events",
    },
    {
      id: "ef511591",
      source: "a8d5f64c",
      target: "8fe59245",
      label: "Promotes urban wildlife conservation efforts",
    },
    {
      id: "f2087bb1",
      source: "a8d5f64c",
      target: "049a9b76",
      label: "Supports community development projects financing",
    },
    {
      id: "8bfd90c7",
      source: "3ec19f58",
      target: "795d758b",
      label: "Travel restrictions and security",
    },
    {
      id: "70351d5d",
      source: "3ec19f58",
      target: "ae6cc92f",
      label: "Economic uncertainty and instability",
    },
    {
      id: "00467f1a",
      source: "3ec19f58",
      target: "c4fea489",
      label: "Increased focus on sustainability",
    },
    {
      id: "1ec5ff7e",
      source: "795d758b",
      target: "f540353d",
      label: "Increased Demand for Tea",
    },
    {
      id: "6f62f01a",
      source: "795d758b",
      target: "ca0d0158",
      label: "Increased Business Travel",
    },
    {
      id: "fa2f058c",
      source: "795d758b",
      target: "569be88d",
      label: "Growing Global Coffee Demand",
    },
    {
      id: "6095ae90",
      source: "f540353d",
      target: "27a21206",
      label: "Competitive Displacement",
    },
    {
      id: "0bd87340",
      source: "f540353d",
      target: "c52705f0",
      label: "Market Share Shift",
    },
    {
      id: "22077858",
      source: "f540353d",
      target: "ec013a11",
      label: "Price Fluctuation",
    },
    {
      id: "11409b9c",
      source: "c52705f0",
      target: "15b976d3",
      label: "Increased tea consumption",
    },
    {
      id: "a421229a",
      source: "c52705f0",
      target: "4e654789",
      label: "Shift in consumer preference",
    },
    {
      id: "a7a910d1",
      source: "c52705f0",
      target: "7b16cda7",
      label: "Increased competition",
    },
    {
      id: "b055b20b",
      source: "569be88d",
      target: "47be50bc",
      label: "Increased global coffee demand",
    },
    {
      id: "cd528baf",
      source: "569be88d",
      target: "cb6501e5",
      label: "Shift in global flavor trends",
    },
    {
      id: "e27ddb55",
      source: "569be88d",
      target: "8855258f",
      label: "Competitive global coffee market",
    },
    {
      id: "0c4d0469",
      source: "569be88d",
      target: "e30775bf",
      label: "Economic opportunities and partnerships",
    },
    {
      id: "b612e28d",
      source: "569be88d",
      target: "4c67375e",
      label: "Increased demand for specialty coffee",
    },
    {
      id: "cca02b04",
      source: "569be88d",
      target: "57154472",
      label: "Growing demand for premium coffee",
    },
    {
      id: "940c4ef3",
      source: "47be50bc",
      target: "1bf586cc",
      label: "Raw material supply change",
    },
    {
      id: "8b9f1413",
      source: "47be50bc",
      target: "41225735",
      label: "Input price fluctuations",
    },
    {
      id: "6fd8df0e",
      source: "47be50bc",
      target: "c0cbcd0e",
      label: "Revenue and trade balance",
    },
    {
      id: "a77378c5",
      source: "cb6501e5",
      target: "50d71bbd",
      label: "Direct economic dependency",
    },
    {
      id: "bb294743",
      source: "cb6501e5",
      target: "c1dcf616",
      label: "Distribute vanilla exports",
    },
    {
      id: "93419b47",
      source: "cb6501e5",
      target: "665e8518",
      label: "Purchase Fijian vanilla",
    },
    {
      id: "e581414c",
      source: "8855258f",
      target: "e5f3a417",
      label: "Increased demand for specialty coffee",
    },
    {
      id: "d2a47e2e",
      source: "8855258f",
      target: "f750696a",
      label: "New market for specialty coffee",
    },
    {
      id: "a9f3bf42",
      source: "8855258f",
      target: "5f68f813",
      label: "Access to high-quality Australian coffee beans",
    },
    {
      id: "69b05daf",
      source: "e30775bf",
      target: "690d80cb",
      label:
        "Shifts in global coffee market dynamics may affect Colombian coffee farmers' market share and pricing strategies.",
    },
    {
      id: "fed06eb3",
      source: "e30775bf",
      target: "db762b49",
      label:
        "Increased production or new trade practices by Ethiopian cooperatives could influence global coffee prices.",
    },
    {
      id: "89d651cb",
      source: "e30775bf",
      target: "e3ffc79e",
      label:
        "Sustainability practices by Ethiopian cooperatives might raise the bar for eco-friendly production, affecting Sumatran farmers' competitiveness.",
    },
    {
      id: "c58b3944",
      source: "4c67375e",
      target: "1b2d6f04",
      label: "Competition increases",
    },
    {
      id: "1663729a",
      source: "4c67375e",
      target: "b42cfcb8",
      label: "Market share lost",
    },
    {
      id: "8d2c87a4",
      source: "4c67375e",
      target: "7bc55127",
      label: "Inspiration found",
    },
    {
      id: "9b9e7f17",
      source: "ae6cc92f",
      target: "59e37ada",
      label: "Job creation and growth",
    },
    {
      id: "056aa989",
      source: "ae6cc92f",
      target: "78a6deb2",
      label: "Increased financial stability",
    },
    {
      id: "d9134b8f",
      source: "ae6cc92f",
      target: "7483be94",
      label: "New ideas and ventures",
    },
    {
      id: "4f2bef91",
      source: "59e37ada",
      target: "4bb712ce",
      label: "Potential funding cuts",
    },
    {
      id: "61b7958c",
      source: "59e37ada",
      target: "69b8a7f7",
      label: "Resource allocation shifts",
    },
    {
      id: "46f49e98",
      source: "59e37ada",
      target: "0b240592",
      label: "Grant funding changes",
    },
    {
      id: "b58b4c8b",
      source: "4bb712ce",
      target: "1f24198f",
      label: "Access to local services",
    },
    {
      id: "59d3155b",
      source: "4bb712ce",
      target: "4a77c996",
      label: "Increased cultural knowledge",
    },
    {
      id: "218c5b58",
      source: "4bb712ce",
      target: "0cd2f713",
      label: "New market opportunities",
    },
    {
      id: "143ff8dc",
      source: "69b8a7f7",
      target: "6f887731",
      label: "Increased local food access",
    },
    {
      id: "2a105251",
      source: "69b8a7f7",
      target: "4c8e2371",
      label: "Increased customer base",
    },
    {
      id: "01e542e0",
      source: "69b8a7f7",
      target: "d3746924",
      label: "Shared gardening activities",
    },
    {
      id: "c5b6d5e5",
      source: "0b240592",
      target: "a6bebb58",
      label: "Increased Cultural Engagement",
    },
    {
      id: "cead0959",
      source: "0b240592",
      target: "45d48750",
      label: "Preservation Funding Boost",
    },
    {
      id: "b1bee92a",
      source: "0b240592",
      target: "52facf22",
      label: "Renewed Interest Revitalization",
    },
    {
      id: "4c353e7c",
      source: "78a6deb2",
      target: "542b7596",
      label: "Reduced consumer spending",
    },
    {
      id: "434823a7",
      source: "78a6deb2",
      target: "8f4939f8",
      label: "Financial hardship leads to less",
    },
    {
      id: "dd8e0f98",
      source: "78a6deb2",
      target: "39880365",
      label: "Decreased consumer demand",
    },
    {
      id: "80f4d985",
      source: "542b7596",
      target: "d7e752f8",
      label: "Lower coffee export prices",
    },
    {
      id: "67d2a1e7",
      source: "542b7596",
      target: "d415361d",
      label: "Increased food costs for employees",
    },
    {
      id: "bdfc7dfd",
      source: "542b7596",
      target: "ef74136f",
      label: "Higher raw material prices",
    },
    {
      id: "2f58b7c8",
      source: "c4fea489",
      target: "19e3e495",
      label: "Lobbying against environmentally damaging projects",
    },
    {
      id: "611de64c",
      source: "c4fea489",
      target: "29d3964f",
      label: "Rising climate risks increase liabilities",
    },
    {
      id: "b8087a1b",
      source: "19e3e495",
      target: "1307ac44",
      label: "Increased demand for building materials",
    },
    {
      id: "1465ea5c",
      source: "19e3e495",
      target: "5c2a038f",
      label: "Changing resident composition",
    },
    {
      id: "6f30d2e9",
      source: "1307ac44",
      target: "37fe1071",
      label: "Increased foot traffic",
    },
    {
      id: "c177db06",
      source: "1307ac44",
      target: "0407c7f6",
      label: "New exhibition opportunities",
    },
    {
      id: "7024bb9f",
      source: "1307ac44",
      target: "71350b43",
      label: "Infrastructure development",
    },
    {
      id: "e9c6836b",
      source: "8ca56a96",
      target: "93d69400",
      label: "Tariffs increase",
    },
    {
      id: "ca79e66f",
      source: "8ca56a96",
      target: "95f61f27",
      label: "Global trade shift",
    },
    {
      id: "cfb7ad17",
      source: "8ca56a96",
      target: "3df33f87",
      label: "Supply chain disruption",
    },
    {
      id: "e16eee4e",
      source: "93d69400",
      target: "8a9db3e7",
      label: "Supply chain disruptions",
    },
    {
      id: "e2fbf13a",
      source: "93d69400",
      target: "40796f73",
      label: "Increased pollution concerns",
    },
    {
      id: "66c76240",
      source: "93d69400",
      target: "ab6c7ea8",
      label: "Shift in travel destinations",
    },
    {
      id: "74e77150",
      source: "40796f73",
      target: "2092c4c3",
      label: "funding shifts towards environmental projects",
    },
    {
      id: "57bd9d17",
      source: "40796f73",
      target: "fb820742",
      label: "increased funding and support",
    },
    {
      id: "03719ecc",
      source: "40796f73",
      target: "36c5452c",
      label: "policy pressure, reduced investments",
    },
    {
      id: "ad20bda3",
      source: "ab6c7ea8",
      target: "5d8482ee",
      label: "Changes in global demand",
    },
    {
      id: "c64b97b7",
      source: "ab6c7ea8",
      target: "3600221a",
      label: "Increased tourism spending",
    },
    {
      id: "47c0846d",
      source: "ab6c7ea8",
      target: "c7780b79",
      label: "Growing interest in exotic food",
    },
    {
      id: "819a0edf",
      source: "c7780b79",
      target: "6e33fba6",
      label: "Increased demand for specialty materials",
    },
    {
      id: "39a69039",
      source: "c7780b79",
      target: "b305d564",
      label: "Growing interest in unique flavors",
    },
    {
      id: "a8cdb0ca",
      source: "c7780b79",
      target: "b7bf7085",
      label: "New opportunities for craft development",
    },
    {
      id: "6cc2b9aa",
      source: "95f61f27",
      target: "3f3bd227",
      label: "Defense Funding Shifts",
    },
    {
      id: "49410de0",
      source: "95f61f27",
      target: "7b920f02",
      label: "Trade Policy Changes",
    },
    {
      id: "fb42284c",
      source: "95f61f27",
      target: "0d95b464",
      label: "Sanction Increases",
    },
    {
      id: "504bc303",
      source: "7b920f02",
      target: "d5a6a348",
      label: "Increased competition in EVs",
    },
    {
      id: "1cb262dd",
      source: "7b920f02",
      target: "cda55150",
      label: "Volkswagen is a major employer",
    },
    {
      id: "2103a6d5",
      source: "7b920f02",
      target: "65484169",
      label: "Disruption due to Volkswagen issues",
    },
    {
      id: "960a7289",
      source: "3df33f87",
      target: "716da417",
      label: "Competition and Market Share",
    },
    {
      id: "9f1f8666",
      source: "3df33f87",
      target: "16a9083a",
      label: "Sustainable Manufacturing Practices",
    },
    {
      id: "a20fca72",
      source: "3df33f87",
      target: "562187b1",
      label: "App Store Revenue Cuts",
    },
    {
      id: "a2a37f93",
      source: "716da417",
      target: "c84f0054",
      label: "Increased competition pressures",
    },
    {
      id: "3607ef68",
      source: "716da417",
      target: "a5adbf76",
      label: "Ecosystem changes",
    },
    {
      id: "ab0b9272",
      source: "716da417",
      target: "47911770",
      label: "Supply chain disruptions",
    },
    {
      id: "7152c19a",
      source: "16a9083a",
      target: "e532e319",
      label: "Climate Change Impacting Yields",
    },
    {
      id: "de4cc6a8",
      source: "16a9083a",
      target: "4537becf",
      label: "Eco-Friendly Regulations Increasing Costs",
    },
    {
      id: "50247fd4",
      source: "16a9083a",
      target: "5492cc26",
      label: "Stricter Emissions Regulations Implemented",
    },
    {
      id: "6f5579f4",
      source: "e532e319",
      target: "2b1e71cb",
      label: "Trade Disruption",
    },
    {
      id: "695174c2",
      source: "e532e319",
      target: "9f98fe01",
      label: "Market Competition",
    },
    {
      id: "a6c5365f",
      source: "e532e319",
      target: "a205521a",
      label: "Price Fluctuation",
    },
    {
      id: "a5e91e14",
      source: "562187b1",
      target: "0b856c33",
      label: "Support local craft economy.",
    },
    {
      id: "e1d2547d",
      source: "562187b1",
      target: "9da93c3b",
      label: "Diversify urban food scenes.",
    },
    {
      id: "c9bfcf8a",
      source: "562187b1",
      target: "c568d690",
      label: "Promote local cultural identity.",
    },
    {
      id: "c7ed2aa7",
      source: "de4feae3",
      target: "16a90677",
      label: "Monetary policy changes required",
    },
    {
      id: "f1ca12ee",
      source: "de4feae3",
      target: "f919ea4c",
      label: "Possible vacancies and appointments",
    },
    {
      id: "5dcf9a5f",
      source: "de4feae3",
      target: "af603370",
      label: "Shift in international policy stance",
    },
    {
      id: "89789cec",
      source: "de4feae3",
      target: "c3a7fd8a",
      label: "Potential political backlash and impact",
    },
    {
      id: "1f274ea3",
      source: "de4feae3",
      target: "0e0081f7",
      label: "Grant funding and partnerships affected",
    },
    {
      id: "02c3e4a2",
      source: "de4feae3",
      target: "3c359400",
      label: "Federal funding and policy changes",
    },
    {
      id: "12e87cc2",
      source: "de4feae3",
      target: "12e088d2",
      label: "Shift in military strategy and funding",
    },
    {
      id: "dde8389c",
      source: "16a90677",
      target: "027546f8",
      label: "Interest rate changes influence demand",
    },
    {
      id: "7baa90d5",
      source: "16a90677",
      target: "0010f1c2",
      label: "US dollar strength/weakness affects",
    },
    {
      id: "48616438",
      source: "027546f8",
      target: "bf2bfedb",
      label: "Fuel Price Increase Costs",
    },
    {
      id: "3ec672b1",
      source: "027546f8",
      target: "7aad87dd",
      label: "Spike in Raw Material Costs",
    },
    {
      id: "ade66b67",
      source: "027546f8",
      target: "5229fc49",
      label: "Global Commodity Price Inflation Risks",
    },
    {
      id: "7399da20",
      source: "0010f1c2",
      target: "fbf65875",
      label: "Fluctuating Profit Margins",
    },
    {
      id: "f178a552",
      source: "0010f1c2",
      target: "3a7d3f78",
      label: "Currency Risk Exposure",
    },
    {
      id: "5a395ea6",
      source: "0010f1c2",
      target: "9ba3b1f8",
      label: "Transfer Fee Changes",
    },
    {
      id: "81848cad",
      source: "fbf65875",
      target: "3fe55b97",
      label: "Disruptions in trade policies",
    },
    {
      id: "42a42c16",
      source: "fbf65875",
      target: "570bf044",
      label: "Changes in product availability",
    },
    {
      id: "01dd3e45",
      source: "fbf65875",
      target: "52ada557",
      label: "Fluctuations in trade volume",
    },
    {
      id: "8f15c074",
      source: "f919ea4c",
      target: "0f0a1301",
      label: "Data Privacy Laws",
    },
    {
      id: "6ea3651b",
      source: "f919ea4c",
      target: "85fb5e99",
      label: "Drug Patent Cases",
    },
    {
      id: "68000df5",
      source: "f919ea4c",
      target: "b2fbd659",
      label: "Labor Rights",
    },
    {
      id: "8ee61744",
      source: "0f0a1301",
      target: "a036d338",
      label: "Increased cybersecurity demand.",
    },
    {
      id: "e85fcf5d",
      source: "0f0a1301",
      target: "fb305044",
      label: "Review of algorithmic fairness.",
    },
    {
      id: "c6e1b637",
      source: "0f0a1301",
      target: "7c2c570f",
      label: "Shift in consumer trust.",
    },
    {
      id: "c2b5232a",
      source: "a036d338",
      target: "ad9914e6",
      label: "Increased security demands",
    },
    {
      id: "f6841bc5",
      source: "a036d338",
      target: "0c1d406a",
      label: "Smart home energy savings",
    },
    {
      id: "e1b5dce3",
      source: "a036d338",
      target: "e9cce384",
      label: "Risk assessment and rates",
    },
    {
      id: "f167b391",
      source: "7c2c570f",
      target: "cd5d4834",
      label: "Increased digital strategy demand.",
    },
    {
      id: "4a5916de",
      source: "7c2c570f",
      target: "11576c79",
      label: "Enhanced data-driven targeting.",
    },
    {
      id: "9f4f0c5a",
      source: "7c2c570f",
      target: "f8992ddc",
      label: "Improved fundraising strategies.",
    },
    {
      id: "5b6a623d",
      source: "cd5d4834",
      target: "5710b939",
      label: "Local media outlets reporting negatively",
    },
    {
      id: "f2df6ad0",
      source: "cd5d4834",
      target: "9186a7f6",
      label: "Increased international scrutiny",
    },
    {
      id: "a0bc5f0a",
      source: "cd5d4834",
      target: "1f7b0919",
      label: "Global media coverage affecting market trends",
    },
    {
      id: "81b80af6",
      source: "11576c79",
      target: "65178196",
      label: "Tax policies and regulations",
    },
    {
      id: "c01bc8ed",
      source: "11576c79",
      target: "edec970a",
      label: "Changes in economic policies",
    },
    {
      id: "4ab346b5",
      source: "11576c79",
      target: "4f2264b3",
      label: "Social services funding prioritization",
    },
    {
      id: "60b5d738",
      source: "85fb5e99",
      target: "575618d4",
      label: "Medication supply change",
    },
    {
      id: "d5ec1659",
      source: "85fb5e99",
      target: "7bbd6d02",
      label: "Drug coverage shifts",
    },
    {
      id: "823f846b",
      source: "85fb5e99",
      target: "a24019bd",
      label: "Funding fluctuations",
    },
    {
      id: "6e1dbc67",
      source: "575618d4",
      target: "21592509",
      label: "Increased healthcare costs",
    },
    {
      id: "322b3d5e",
      source: "575618d4",
      target: "ef14647b",
      label: "Reduced consumer spending",
    },
    {
      id: "8bd8fd69",
      source: "575618d4",
      target: "ab5ffc73",
      label: "Shift in population",
    },
    {
      id: "69eaa3ef",
      source: "7bbd6d02",
      target: "562594e4",
      label: "Loss of government funding",
    },
    {
      id: "7e4db0aa",
      source: "7bbd6d02",
      target: "735dbf30",
      label: "Reduction in local budget",
    },
    {
      id: "af17d72c",
      source: "7bbd6d02",
      target: "7adfd3f2",
      label: "Increased costs due inflation",
    },
    {
      id: "6260d082",
      source: "b2fbd659",
      target: "5ecffa8c",
      label: "Increased labor costs nationwide",
    },
    {
      id: "297b90d6",
      source: "b2fbd659",
      target: "7ad79677",
      label: "Shortage of seasonal workers",
    },
    {
      id: "a3939761",
      source: "b2fbd659",
      target: "48bc6f67",
      label: "Loss of skilled farm workers",
    },
    {
      id: "81c66890",
      source: "b2fbd659",
      target: "c6c95dad",
      label: "Shortage of migrant laborers",
    },
    {
      id: "2319b6cc",
      source: "5ecffa8c",
      target: "d48191ce",
      label: "Alternative logistics provider",
    },
    {
      id: "eb11fb16",
      source: "5ecffa8c",
      target: "aad3fcfe",
      label: "Increased competition online",
    },
    {
      id: "c9de9448",
      source: "5ecffa8c",
      target: "2daee2bc",
      label: "Dominant market share",
    },
    {
      id: "ca7715c4",
      source: "2daee2bc",
      target: "8f76e6ee",
      label: "Increased demand",
    },
    {
      id: "c25f018a",
      source: "2daee2bc",
      target: "b32a4fed",
      label: "New job opportunities",
    },
    {
      id: "26589244",
      source: "2daee2bc",
      target: "6d781ea1",
      label: "Higher security needs",
    },
    {
      id: "ef796481",
      source: "af603370",
      target: "5c178be6",
      label: "Trade agreement changes",
    },
    {
      id: "86e1dbe5",
      source: "af603370",
      target: "7be577a6",
      label: "Increased access funding",
    },
    {
      id: "2b66ea93",
      source: "af603370",
      target: "abb0cc08",
      label: "New export opportunities",
    },
    {
      id: "1ac7b906",
      source: "5c178be6",
      target: "9a69f314",
      label: "Reduced competition",
    },
    {
      id: "a745bfd6",
      source: "5c178be6",
      target: "4cd759df",
      label: "Decreased content diversity",
    },
    {
      id: "a46a2ea0",
      source: "5c178be6",
      target: "c02499ae",
      label: "Less market variety",
    },
    {
      id: "3a881ba4",
      source: "7be577a6",
      target: "cad79930",
      label: "Increased investment opportunities",
    },
    {
      id: "6e99f817",
      source: "7be577a6",
      target: "ba1e7aad",
      label: "Increased demand for coffee",
    },
    {
      id: "2eaf5cf6",
      source: "7be577a6",
      target: "c2a7146d",
      label: "New market opportunities emerging",
    },
    {
      id: "45ad03ff",
      source: "cad79930",
      target: "426b96b8",
      label: "Investment Opportunities",
    },
    {
      id: "440d2c23",
      source: "cad79930",
      target: "5633b910",
      label: "New Markets Found",
    },
    {
      id: "2ae5e795",
      source: "cad79930",
      target: "d4dd3ebd",
      label: "Increased Funding",
    },
    {
      id: "431446b1",
      source: "abb0cc08",
      target: "28390701",
      label: "Automation and logistics improvements",
    },
    {
      id: "322ef67f",
      source: "abb0cc08",
      target: "7a7dbca6",
      label: "Job creation and displacement",
    },
    {
      id: "f868a900",
      source: "abb0cc08",
      target: "162df72e",
      label: "Tech industry investment and growth",
    },
    {
      id: "fcd4c479",
      source: "28390701",
      target: "9b266420",
      label: "Disruptions to global trade routes",
    },
    {
      id: "5e150ad6",
      source: "28390701",
      target: "0daec53d",
      label: "Ingredient shortages and price increases",
    },
    {
      id: "01b6cc6a",
      source: "28390701",
      target: "74959f72",
      label: "Supply chain bottlenecks for materials",
    },
    {
      id: "0111a134",
      source: "c3a7fd8a",
      target: "96666130",
      label: "Increased regulatory uncertainty",
    },
    {
      id: "6754d25e",
      source: "c3a7fd8a",
      target: "cd8dd652",
      label: "Potential changes to Medicare",
    },
    {
      id: "61a58c9b",
      source: "c3a7fd8a",
      target: "34933e29",
      label: "Shift in climate change policies",
    },
    {
      id: "aca2bd22",
      source: "96666130",
      target: "26b92d2b",
      label: "Lending policies adjust.",
    },
    {
      id: "16ea9f6c",
      source: "96666130",
      target: "d5d35826",
      label: "Loan eligibility changes.",
    },
    {
      id: "63565b88",
      source: "96666130",
      target: "145dba48",
      label: "Risk assessment shifts.",
    },
    {
      id: "9fa60c50",
      source: "cd8dd652",
      target: "65e10353",
      label: "Influence housing policies",
    },
    {
      id: "585b3f97",
      source: "cd8dd652",
      target: "3827b646",
      label: "Affect drug pricing policies",
    },
    {
      id: "07e1b8c5",
      source: "cd8dd652",
      target: "638cfb21",
      label: "Demand better accessibility",
    },
    {
      id: "1c144db5",
      source: "34933e29",
      target: "5c2d37b6",
      label: "Increased Funding Opportunities",
    },
    {
      id: "17655968",
      source: "34933e29",
      target: "a9f8000e",
      label: "Boost in Demand Growth",
    },
    {
      id: "10d9f049",
      source: "34933e29",
      target: "2b602d59",
      label: "Enhanced Environmental Protections",
    },
    {
      id: "ac5d1868",
      source: "5c2d37b6",
      target: "e5da718e",
      label: "Loss of grazing land",
    },
    {
      id: "e630a91c",
      source: "5c2d37b6",
      target: "f6b50a4b",
      label: "Increased land protection",
    },
    {
      id: "1380571b",
      source: "5c2d37b6",
      target: "9b9b8a6d",
      label: "Enhanced conservation funding",
    },
    {
      id: "d25a9991",
      source: "2b602d59",
      target: "2c07e2d0",
      label: "Influence traditional practices.",
    },
    {
      id: "d615553f",
      source: "2b602d59",
      target: "f2908b7e",
      label: "Promote eco-friendly methods.",
    },
    {
      id: "9cd2603e",
      source: "2b602d59",
      target: "8995a2fc",
      label: "Inspire ethical trends.",
    },
    {
      id: "d9406c63",
      source: "0e0081f7",
      target: "b95da1ab",
      label: "Resource Provision",
    },
    {
      id: "35e80d0e",
      source: "0e0081f7",
      target: "a4717e47",
      label: "Advocacy & Support",
    },
    {
      id: "67f634eb",
      source: "0e0081f7",
      target: "0312df48",
      label: "Collaboration & Funding",
    },
    {
      id: "dad6b60a",
      source: "b95da1ab",
      target: "7f196809",
      label: "Increased local patronage",
    },
    {
      id: "d1a6f005",
      source: "b95da1ab",
      target: "90b8e530",
      label: "Unique local experiences",
    },
    {
      id: "da98aa68",
      source: "b95da1ab",
      target: "9dd26200",
      label: "Demand for locally made goods",
    },
    {
      id: "4db121b3",
      source: "90b8e530",
      target: "983cd2e8",
      label: "Changes in travel patterns",
    },
    {
      id: "ac91feab",
      source: "90b8e530",
      target: "26e49aad",
      label: "Increased tourism revenue",
    },
    {
      id: "170b46e2",
      source: "90b8e530",
      target: "762cf5b1",
      label: "Boost to local economies",
    },
    {
      id: "0c090bdb",
      source: "9dd26200",
      target: "33ab92f3",
      label: "Increased demand for handmade products",
    },
    {
      id: "81eff569",
      source: "9dd26200",
      target: "57b5fe12",
      label: "New market opportunities for members",
    },
    {
      id: "454237f4",
      source: "9dd26200",
      target: "27b9d073",
      label: "Renewed interest in traditional crafts",
    },
    {
      id: "2f8f7f90",
      source: "27b9d073",
      target: "0f13eb52",
      label: "Increased foot traffic, exposure",
    },
    {
      id: "00da5a7a",
      source: "27b9d073",
      target: "a15b1cfc",
      label: "Showcase local artists, events",
    },
    {
      id: "30e1a2c2",
      source: "27b9d073",
      target: "187484fa",
      label: "Cultural experiences, unique offerings",
    },
    {
      id: "686b9762",
      source: "a4717e47",
      target: "81721621",
      label: "Reduced consumer spending",
    },
    {
      id: "950a37a8",
      source: "a4717e47",
      target: "dc18d7ec",
      label: "Decreased sales demand",
    },
    {
      id: "e74a3715",
      source: "a4717e47",
      target: "2f7aa466",
      label: "Limited budget allocation",
    },
    {
      id: "ed103db4",
      source: "81721621",
      target: "0df8b172",
      label: "Hops demand increases sharply",
    },
    {
      id: "8482962f",
      source: "81721621",
      target: "8523dd50",
      label: "Increased competition expected",
    },
    {
      id: "27976181",
      source: "81721621",
      target: "35ac7f1a",
      label: "Bottle demand surges higher",
    },
    {
      id: "cd9f6323",
      source: "2f7aa466",
      target: "7b28c936",
      label: "New opportunities arise",
    },
    {
      id: "52055321",
      source: "2f7aa466",
      target: "4b2d61b4",
      label: "Increased submissions",
    },
    {
      id: "1edde8e4",
      source: "2f7aa466",
      target: "0c610c5c",
      label: "Expanded content library",
    },
    {
      id: "54da21d0",
      source: "0312df48",
      target: "efb8e979",
      label: "Increased health claims",
    },
    {
      id: "b403dfd2",
      source: "0312df48",
      target: "76f0bd77",
      label: "Health regulations compliance",
    },
    {
      id: "1c18f0e1",
      source: "0312df48",
      target: "1a18a633",
      label: "Community health support",
    },
    {
      id: "a05224f0",
      source: "1a18a633",
      target: "aec65fae",
      label: "Access to funding and resources",
    },
    {
      id: "ddbb52f8",
      source: "1a18a633",
      target: "d24f6b86",
      label: "Increased access to markets",
    },
    {
      id: "14045c5b",
      source: "1a18a633",
      target: "18fdef90",
      label: "New opportunities for economic growth",
    },
    {
      id: "7764687d",
      source: "1a18a633",
      target: "248870e8",
      label: "Increased tourism and revenue",
    },
    {
      id: "7994dea6",
      source: "1a18a633",
      target: "79aaf975",
      label: "New opportunities for local authors",
    },
    {
      id: "fb1dfbbe",
      source: "d24f6b86",
      target: "4e1bb193",
      label: "Changes in food supply",
    },
    {
      id: "21a9720e",
      source: "d24f6b86",
      target: "b13c111c",
      label: "Farm-based tourism experiences",
    },
    {
      id: "dff263ab",
      source: "d24f6b86",
      target: "4c72ce4c",
      label: "Ingredient sourcing disrupted",
    },
    {
      id: "2343dae1",
      source: "3c359400",
      target: "a9256caf",
      label: "Policy Changes",
    },
    {
      id: "271e3ede",
      source: "3c359400",
      target: "80602bc4",
      label: "Funding Allocation",
    },
    {
      id: "c0c9c757",
      source: "3c359400",
      target: "f0683653",
      label: "Budget Prioritization",
    },
    {
      id: "d4da1c40",
      source: "a9256caf",
      target: "a23b8439",
      label: "Increased demand for crafts",
    },
    {
      id: "9dfba55f",
      source: "a9256caf",
      target: "ba4ef4f1",
      label: "Access to mentorship programs",
    },
    {
      id: "0d1c6fa4",
      source: "a9256caf",
      target: "39fc21a2",
      label: "Growing demand for local produce",
    },
    {
      id: "f2c5ea6e",
      source: "a23b8439",
      target: "40c5d10d",
      label: "Boost from local artisanal products",
    },
    {
      id: "7ac1e27a",
      source: "a23b8439",
      target: "eee47776",
      label: "Preservation through traditional crafts",
    },
    {
      id: "cb0afaa9",
      source: "a23b8439",
      target: "8b2cec05",
      label: "Promotion of eco-friendly methods",
    },
    {
      id: "d85449c2",
      source: "39fc21a2",
      target: "8f08abbf",
      label: "Increased supply of fresh produce",
    },
    {
      id: "704a59c7",
      source: "39fc21a2",
      target: "4265c08e",
      label: "Urban space utilization changes",
    },
    {
      id: "6846e952",
      source: "39fc21a2",
      target: "98ee4b80",
      label: "Improved access to fresh food",
    },
    {
      id: "b75ae5b4",
      source: "4265c08e",
      target: "23f332d4",
      label: "Local Economic Stimulus",
    },
    {
      id: "dff2dd4a",
      source: "4265c08e",
      target: "aca6270a",
      label: "Agricultural Support System",
    },
    {
      id: "25ff0a75",
      source: "4265c08e",
      target: "56dd8110",
      label: "Financial Institution Support",
    },
    {
      id: "57cb60a8",
      source: "80602bc4",
      target: "2501459d",
      label: "Increased job opportunities",
    },
    {
      id: "c8296bfb",
      source: "80602bc4",
      target: "e93e5a33",
      label: "Improved transportation networks",
    },
    {
      id: "545d6c0b",
      source: "80602bc4",
      target: "4dce82a1",
      label: "Enhanced connectivity access",
    },
    {
      id: "8e2d502c",
      source: "2501459d",
      target: "13553100",
      label: "Cloud service infrastructure",
    },
    {
      id: "5c7bbec4",
      source: "2501459d",
      target: "532bb544",
      label: "Software development partnerships",
    },
    {
      id: "201fc6be",
      source: "2501459d",
      target: "d302d857",
      label: "Short-term rental regulations",
    },
    {
      id: "6067b7e3",
      source: "e93e5a33",
      target: "f08d384d",
      label: "Changed risk assessments",
    },
    {
      id: "d87aa261",
      source: "e93e5a33",
      target: "61c2d21f",
      label: "Altered customer demand",
    },
    {
      id: "25e8f175",
      source: "e93e5a33",
      target: "7ce61be3",
      label: "Potential demand fluctuations",
    },
    {
      id: "73b5d8de",
      source: "4dce82a1",
      target: "79f55c35",
      label: "Reduced government funding",
    },
    {
      id: "a96997ef",
      source: "4dce82a1",
      target: "c362809b",
      label: "Shift in audience interest",
    },
    {
      id: "3349cc78",
      source: "4dce82a1",
      target: "d49f73ce",
      label: "Changes in member support",
    },
    {
      id: "6a7d2c07",
      source: "f0683653",
      target: "1b8e6e78",
      label: "Shapes skill development.",
    },
    {
      id: "f93550c8",
      source: "f0683653",
      target: "79f40f7b",
      label: "Influences property values.",
    },
    {
      id: "4633eec5",
      source: "f0683653",
      target: "6ed516ab",
      label: "Impacts labor quality.",
    },
    {
      id: "5fc0cb04",
      source: "12e088d2",
      target: "7375f7a8",
      label: "Hired for security",
    },
    {
      id: "2a98abc0",
      source: "12e088d2",
      target: "f6657ccf",
      label: "Protection services",
    },
    {
      id: "7b9d939d",
      source: "12e088d2",
      target: "36bae97c",
      label: "Regulation compliance",
    },
    {
      id: "19b502f1",
      source: "7375f7a8",
      target: "9a702eea",
      label: "Loss of investor trust",
    },
    {
      id: "417249b7",
      source: "7375f7a8",
      target: "f5fd7731",
      label: "Increased cyber security threats",
    },
    {
      id: "3f8ba700",
      source: "7375f7a8",
      target: "93f502e0",
      label: "Reduced global economic confidence",
    },
    {
      id: "d83166d7",
      source: "9a702eea",
      target: "f733730b",
      label: "New investment opportunities",
    },
    {
      id: "4c861e1c",
      source: "9a702eea",
      target: "751f415d",
      label: "Alternative payment method",
    },
    {
      id: "87007203",
      source: "9a702eea",
      target: "731976bd",
      label: "Decentralized financial system",
    },
    {
      id: "b2a7b276",
      source: "731976bd",
      target: "59c143b1",
      label: "shifts in supply and demand",
    },
    {
      id: "d1d09b6e",
      source: "731976bd",
      target: "99286657",
      label: "increased funding needs",
    },
    {
      id: "453756d5",
      source: "731976bd",
      target: "09b6e50c",
      label: "investment risk assessment",
    },
    {
      id: "98c3fbb2",
      source: "f6657ccf",
      target: "16c79e96",
      label: "Loss of Trump's Patronage",
    },
    {
      id: "f27b7257",
      source: "f6657ccf",
      target: "792c5b2c",
      label: "Shift in Government Funding",
    },
    {
      id: "2c18fbf7",
      source: "f6657ccf",
      target: "cc3f97d8",
      label: "Increased Regulatory Scrutiny",
    },
    {
      id: "45548c8f",
      source: "16c79e96",
      target: "b882b72b",
      label: "Influenced by Luxury Trends",
    },
    {
      id: "0212261e",
      source: "16c79e96",
      target: "4279a4fd",
      label: "Affected by Luxury Sales",
    },
    {
      id: "5a3c1ca8",
      source: "16c79e96",
      target: "8a2ad59e",
      label: "Impacted by Luxury Goods",
    },
    {
      id: "9456bcf6",
      source: "b882b72b",
      target: "01a63469",
      label: "Increased demand for high-end",
    },
    {
      id: "76158b98",
      source: "b882b72b",
      target: "b320021a",
      label: "Potential for high-end fashion",
    },
    {
      id: "2172cd16",
      source: "b882b72b",
      target: "5f512fef",
      label: "Increased appeal for luxury goods",
    },
    {
      id: "c2059f89",
      source: "4279a4fd",
      target: "3c00c104",
      label: "Dependent on upscale retail",
    },
    {
      id: "16ceb1f0",
      source: "4279a4fd",
      target: "5255ec26",
      label: "Affluent shoppers' preferences",
    },
    {
      id: "8b2c8a8d",
      source: "4279a4fd",
      target: "026a4f4e",
      label: "Target same demographic",
    },
    {
      id: "a68eb961",
      source: "792c5b2c",
      target: "1da70f68",
      label: "Advances material science needs",
    },
    {
      id: "df215a43",
      source: "792c5b2c",
      target: "699aa55d",
      label: "New satellite deployment options",
    },
    {
      id: "5681b308",
      source: "792c5b2c",
      target: "7ad710e6",
      label: "Enhanced data collection methods",
    },
    {
      id: "c6acea4e",
      source: "7ad710e6",
      target: "021974ab",
      label: "Land use and resource",
    },
    {
      id: "439fc1e2",
      source: "7ad710e6",
      target: "7a17cc2f",
      label: "Geospatial mapping and sales",
    },
    {
      id: "125f0ddb",
      source: "7ad710e6",
      target: "5fecc92f",
      label: "Route optimization and logistics",
    },
    {
      id: "cc2a55e1",
      source: "36bae97c",
      target: "6e52609d",
      label: "Increased jurisdiction enforcement",
    },
    {
      id: "a0d26258",
      source: "36bae97c",
      target: "429df1ef",
      label: "New avenues for legal action",
    },
    {
      id: "0812f664",
      source: "429df1ef",
      target: "5a65b435",
      label: "Shifts investment priorities",
    },
    {
      id: "f13694b4",
      source: "429df1ef",
      target: "084fbc7e",
      label: "Increased aid reliance",
    },
    {
      id: "b02794d6",
      source: "429df1ef",
      target: "3c92e22c",
      label: "Altered trade routes",
    },
    {
      id: "f1e7eee4",
      source: "b65f9c44",
      target: "f2f19d6f",
      label: "Policy changes",
    },
    {
      id: "800230c7",
      source: "b65f9c44",
      target: "016eac41",
      label: "Potential expansion",
    },
    {
      id: "d784847a",
      source: "b65f9c44",
      target: "f8295de4",
      label: "Focus on equity",
    },
    {
      id: "9ad660bf",
      source: "f2f19d6f",
      target: "cd77d1cb",
      label: "Increased Compliance Costs",
    },
    {
      id: "a16ee9cf",
      source: "f2f19d6f",
      target: "3fff5641",
      label: "Stricter Environmental Standards",
    },
    {
      id: "bb2c9196",
      source: "f2f19d6f",
      target: "16871dbe",
      label: "Loss of Autonomy",
    },
    {
      id: "7ba3ae37",
      source: "cd77d1cb",
      target: "6e602d2a",
      label: "Increased lending needs",
    },
    {
      id: "a843d408",
      source: "cd77d1cb",
      target: "ea403270",
      label: "Rental demand changes",
    },
    {
      id: "401ad42b",
      source: "cd77d1cb",
      target: "5fde8c93",
      label: "Risk assessment shifts",
    },
    {
      id: "b684b12e",
      source: "5fde8c93",
      target: "fae93b38",
      label: "Increased risk assessments, premiums",
    },
    {
      id: "1e932511",
      source: "5fde8c93",
      target: "6b0783e3",
      label: "Demand for updated models, data",
    },
    {
      id: "048a0b3b",
      source: "5fde8c93",
      target: "49fa86a4",
      label: "Funding shifts, disaster relief",
    },
    {
      id: "f46fd7cd",
      source: "fae93b38",
      target: "c40c4820",
      label: "Market volatility increases",
    },
    {
      id: "fbd4e569",
      source: "fae93b38",
      target: "0216727d",
      label: "Increased risk aversion",
    },
    {
      id: "782bf9ff",
      source: "fae93b38",
      target: "77a37754",
      label: "Revised underwriting standards",
    },
    {
      id: "98105583",
      source: "49fa86a4",
      target: "6f91c176",
      label: "decline in global coffee prices",
    },
    {
      id: "896489ea",
      source: "49fa86a4",
      target: "819f6e64",
      label: "loss of international aid funding",
    },
    {
      id: "d6af82d8",
      source: "49fa86a4",
      target: "eec2301b",
      label: "decrease in global travel demand",
    },
    {
      id: "05c94acd",
      source: "3fff5641",
      target: "9b41c1c2",
      label: "Loss of natural attractions",
    },
    {
      id: "2f93dcbb",
      source: "3fff5641",
      target: "e1e6f59c",
      label: "Impact on agricultural production",
    },
    {
      id: "5a759abd",
      source: "3fff5641",
      target: "f642deca",
      label: "Shift to eco-friendly infrastructure",
    },
    {
      id: "c77a35bd",
      source: "9b41c1c2",
      target: "cdbc6d18",
      label: "Dutch tourists boost tea sales",
    },
    {
      id: "fc5bb420",
      source: "9b41c1c2",
      target: "a956388f",
      label: "Global tech tourists increase demand",
    },
    {
      id: "2e2aef88",
      source: "9b41c1c2",
      target: "f4304490",
      label: "Increased tourism supports coffee trade",
    },
    {
      id: "9f098963",
      source: "e1e6f59c",
      target: "24e79dee",
      label: "Supply chain logistics issues",
    },
    {
      id: "46ee5c5d",
      source: "e1e6f59c",
      target: "bd5a8f5a",
      label: "Disrupted local food distribution",
    },
    {
      id: "f6f290c3",
      source: "e1e6f59c",
      target: "c2392929",
      label: "Increased food costs risk",
    },
    {
      id: "501a1554",
      source: "c2392929",
      target: "eff0e0e1",
      label: "Increased Reviews",
    },
    {
      id: "11c6eaac",
      source: "c2392929",
      target: "3da6a17e",
      label: "More Sales",
    },
    {
      id: "970627df",
      source: "c2392929",
      target: "3aec8048",
      label: "Higher Demand",
    },
    {
      id: "cf64b0b9",
      source: "f642deca",
      target: "1eea4a99",
      label: "Supply Chain Disruption",
    },
    {
      id: "77aaac9f",
      source: "f642deca",
      target: "c5c8d06b",
      label: "Increased Regulation",
    },
    {
      id: "3a42c2fa",
      source: "f642deca",
      target: "555ebb24",
      label: "Fuel Price Fluctuation",
    },
    {
      id: "51d34991",
      source: "1eea4a99",
      target: "4f4b7270",
      label: "Depend on logistics",
    },
    {
      id: "3333e038",
      source: "1eea4a99",
      target: "766eca91",
      label: "Reliant on logistics services",
    },
    {
      id: "2aabed13",
      source: "1eea4a99",
      target: "0581cad4",
      label: "Impacted by logistics costs",
    },
    {
      id: "05bf9b2e",
      source: "c5c8d06b",
      target: "9fd6882e",
      label: "Sales Volume",
    },
    {
      id: "17d1eb67",
      source: "c5c8d06b",
      target: "dab7b732",
      label: "Fleet Demand",
    },
    {
      id: "1a2a1463",
      source: "c5c8d06b",
      target: "a1cc7e40",
      label: "Supply Chain",
    },
    {
      id: "d1213302",
      source: "16871dbe",
      target: "bee8eb93",
      label: "Funding Changes",
    },
    {
      id: "16189c76",
      source: "16871dbe",
      target: "f3a37dc7",
      label: "Policy Shifts",
    },
    {
      id: "73d25505",
      source: "16871dbe",
      target: "aedfc6f6",
      label: "Regulatory Updates",
    },
    {
      id: "7d79ca8d",
      source: "bee8eb93",
      target: "1daa8461",
      label: "Financial disruption expected",
    },
    {
      id: "5da6c39e",
      source: "bee8eb93",
      target: "62218095",
      label: "Loss of financial stability",
    },
    {
      id: "597c492b",
      source: "bee8eb93",
      target: "78c8c014",
      label: "Reduced access to funding",
    },
    {
      id: "816e0119",
      source: "f3a37dc7",
      target: "14e309ae",
      label: "Increased foreign visitors",
    },
    {
      id: "2dbb49df",
      source: "f3a37dc7",
      target: "01bbd33d",
      label: "Boosted international demand",
    },
    {
      id: "738cbe17",
      source: "f3a37dc7",
      target: "e6bbac6e",
      label: "Higher travel finance",
    },
    {
      id: "b4ec971c",
      source: "016eac41",
      target: "3c811f72",
      label: "Shift in customer spending",
    },
    {
      id: "f7cb5189",
      source: "016eac41",
      target: "ff65edd9",
      label: "Changes in drug pricing",
    },
    {
      id: "884336ef",
      source: "3c811f72",
      target: "65725845",
      label: "Supply chain price inflation",
    },
    {
      id: "8cbd5501",
      source: "3c811f72",
      target: "8e9ea6ba",
      label: "Increased costs for vendors",
    },
    {
      id: "07cfde5f",
      source: "3c811f72",
      target: "6903f4a5",
      label: "Risk assessment and coverage",
    },
    {
      id: "e36347c9",
      source: "6903f4a5",
      target: "c89cc530",
      label: "Banking failures disrupt trade",
    },
    {
      id: "876f52f8",
      source: "6903f4a5",
      target: "69f061ba",
      label: "Credit access restricted",
    },
    {
      id: "168717f4",
      source: "6903f4a5",
      target: "21e215d6",
      label: "Funding sources destabilized",
    },
    {
      id: "72f26dac",
      source: "ff65edd9",
      target: "30c8fb60",
      label: "Increased Research Funding",
    },
    {
      id: "30db51a8",
      source: "ff65edd9",
      target: "621cc847",
      label: "New Patent Opportunities",
    },
    {
      id: "2aff7227",
      source: "ff65edd9",
      target: "162d1220",
      label: "Innovative Treatment Options",
    },
    {
      id: "012e2e7b",
      source: "f8295de4",
      target: "5e6b76be",
      label: "Increased cybersecurity threats",
    },
    {
      id: "b9b95e95",
      source: "f8295de4",
      target: "487ff84e",
      label: "Loss of government contracts",
    },
    {
      id: "62e4220a",
      source: "f8295de4",
      target: "d3f22710",
      label: "Decreased international visitor numbers",
    },
    {
      id: "746f6a19",
      source: "5e6b76be",
      target: "b2c6b200",
      label: "Tech companies influence content distribution.",
    },
    {
      id: "d5d47b92",
      source: "5e6b76be",
      target: "519ce2ab",
      label: "Investment in autonomous vehicles.",
    },
    {
      id: "c5fa19ee",
      source: "5e6b76be",
      target: "e74149af",
      label: "Innovation in farming technology.",
    },
    {
      id: "ee0cec20",
      source: "487ff84e",
      target: "7e4a97a4",
      label: "Increased Demand for Local Produce",
    },
    {
      id: "89a6f4f9",
      source: "487ff84e",
      target: "4e3acfca",
      label: "Growing Interest in Handmade Goods",
    },
    {
      id: "a75d1ced",
      source: "487ff84e",
      target: "0ce9709c",
      label: "Boosted Community Development Funding",
    },
    {
      id: "ab747b5a",
      source: "487ff84e",
      target: "f3e7d044",
      label: "Increased Tourism and Patronage",
    },
    {
      id: "c79c1589",
      source: "487ff84e",
      target: "85ee9c83",
      label: "Growing Appetite for Local Cuisine",
    },
    {
      id: "e8237d0e",
      source: "487ff84e",
      target: "9b6b9f13",
      label: "Resurgence of Physical Book Sales",
    },
    {
      id: "fc154baf",
      source: "7e4a97a4",
      target: "66e8de14",
      label: "Increased market demand",
    },
    {
      id: "54f0ff39",
      source: "7e4a97a4",
      target: "d33ddbd3",
      label: "Higher sales demand",
    },
    {
      id: "18a627af",
      source: "7e4a97a4",
      target: "7ba296e4",
      label: "Fresh produce supply increase",
    },
    {
      id: "e300da04",
      source: "0ce9709c",
      target: "9473869a",
      label: "Loss of research funding",
    },
    {
      id: "34ae2ae5",
      source: "0ce9709c",
      target: "4b52603a",
      label: "Shift in donation patterns",
    },
    {
      id: "041c6f98",
      source: "0ce9709c",
      target: "4fbf097b",
      label: "Changes in sponsorship",
    },
    {
      id: "6ffa62af",
      source: "9b6b9f13",
      target: "494bd1f5",
      label: "Increased Book Sales",
    },
    {
      id: "f114860a",
      source: "9b6b9f13",
      target: "d9c522a5",
      label: "More Author Appearances",
    },
    {
      id: "7d47dc19",
      source: "9b6b9f13",
      target: "5e573ca9",
      label: "New Titles Discussions",
    },
    {
      id: "091c9136",
      source: "d3f22710",
      target: "086ed4f1",
      label: "Bookings Increase",
    },
    {
      id: "7264c6d9",
      source: "d3f22710",
      target: "8b3611bb",
      label: "Flight Demand",
    },
    {
      id: "591638f8",
      source: "d3f22710",
      target: "c9b6a159",
      label: "Revenue Boost",
    },
    {
      id: "4dd2a568",
      source: "086ed4f1",
      target: "37425d47",
      label: "Increased Tourism Spending",
    },
    {
      id: "b9596f96",
      source: "086ed4f1",
      target: "f980e12f",
      label: "Increased Film Location Bookings",
    },
    {
      id: "0edda63f",
      source: "086ed4f1",
      target: "77121246",
      label: "Increased Demand for Decor",
    },
    {
      id: "254ddf61",
      source: "37425d47",
      target: "0cf9ae3a",
      label: "Increased coffee demand and prices",
    },
    {
      id: "a491a7f7",
      source: "37425d47",
      target: "44360069",
      label: "Increased coffee sales on flights",
    },
    {
      id: "6ffbfbb6",
      source: "37425d47",
      target: "1e8c8915",
      label: "Investment opportunities in coffee industry",
    },
    {
      id: "057ee23d",
      source: "77121246",
      target: "55a48508",
      label: "Bangladeshi textile competition",
    },
    {
      id: "db10987a",
      source: "77121246",
      target: "20be36ea",
      label: "Global textile market shift",
    },
    {
      id: "22093976",
      source: "77121246",
      target: "a66f5829",
      label: "Global supply chain disruption",
    },
    {
      id: "de2b2189",
      source: "8b3611bb",
      target: "7fbc7ada",
      label: "Potential diplomatic tensions",
    },
    {
      id: "75133e66",
      source: "8b3611bb",
      target: "1078d545",
      label: "Competitive market shifts",
    },
    {
      id: "3460dbab",
      source: "8b3611bb",
      target: "bae54fa3",
      label: "Possible economic repercussions",
    },
    {
      id: "1a087e70",
      source: "7fbc7ada",
      target: "2fa343db",
      label: "Political Instability",
    },
    {
      id: "d54646df",
      source: "7fbc7ada",
      target: "ad9b0801",
      label: "Economic Shifts",
    },
    {
      id: "459a0dff",
      source: "7fbc7ada",
      target: "62f0d2cc",
      label: "Diplomatic Tensions",
    },
    {
      id: "422f5ab2",
      source: "1078d545",
      target: "1a1fefb9",
      label: "Increased Middle Eastern trade",
    },
    {
      id: "0b3b44b0",
      source: "1078d545",
      target: "9d147308",
      label: "Growing demand for Middle Eastern tourists",
    },
    {
      id: "d940cc07",
      source: "1078d545",
      target: "7f285341",
      label: "Increased Middle Eastern travel bookings",
    },
    {
      id: "c350af35",
      source: "bae54fa3",
      target: "36b3baa5",
      label: "Financial stability concerns",
    },
    {
      id: "81566df0",
      source: "bae54fa3",
      target: "5e5f1c22",
      label: "Luxury market fluctuation",
    },
    {
      id: "583aa0c9",
      source: "bae54fa3",
      target: "b4fbe3bb",
      label: "Increased travel demand",
    },
    {
      id: "7b14aee7",
      source: "610bea20",
      target: "ca6bc001",
      label: "Increased global diplomatic engagement",
    },
    {
      id: "aa08bdfc",
      source: "610bea20",
      target: "0453e038",
      label: "Shift in international security dynamics",
    },
    {
      id: "963352e3",
      source: "610bea20",
      target: "112d2eb2",
      label: "Reevaluation of US-EU trade relations",
    },
    {
      id: "fb8e3863",
      source: "610bea20",
      target: "4373125c",
      label: "Potential increase in global influence",
    },
    {
      id: "98bbd3ff",
      source: "610bea20",
      target: "bf0cf11c",
      label: "Potential changes in migration policies",
    },
    {
      id: "d9f87fce",
      source: "610bea20",
      target: "49e6c839",
      label: "Potential shifts in regional politics",
    },
    {
      id: "85a53b30",
      source: "ca6bc001",
      target: "2ac189cc",
      label: "Economic sanctions and travel bans",
    },
    {
      id: "c1447707",
      source: "ca6bc001",
      target: "cf92ad20",
      label: "International trade and investment restrictions",
    },
    {
      id: "a240c79a",
      source: "ca6bc001",
      target: "00ecc449",
      label: "Cultural exchange and artifact export regulations",
    },
    {
      id: "d1cc34fb",
      source: "2ac189cc",
      target: "2c5d9399",
      label: "Increased tourist demand",
    },
    {
      id: "6aef1ee5",
      source: "2ac189cc",
      target: "0f1150c9",
      label: "Higher occupancy rates",
    },
    {
      id: "47c540d2",
      source: "2ac189cc",
      target: "e2696f80",
      label: "Boosted visitor numbers",
    },
    {
      id: "a70b4651",
      source: "00ecc449",
      target: "8dea3a42",
      label: "Increased cultural significance",
    },
    {
      id: "613be9c7",
      source: "00ecc449",
      target: "f8965709",
      label: "High demand for cultural relics",
    },
    {
      id: "997f6683",
      source: "00ecc449",
      target: "935771b7",
      label: "Return of cultural artifacts",
    },
    {
      id: "5ef5dc0c",
      source: "8dea3a42",
      target: "74eaa3c5",
      label: "Increased Tourism and Revenue",
    },
    {
      id: "4a7d027e",
      source: "8dea3a42",
      target: "54fe18e9",
      label: "Growth in Food Culture Scene",
    },
    {
      id: "5e83e11f",
      source: "8dea3a42",
      target: "b400af09",
      label: "New Business Opportunities and Exposure",
    },
    {
      id: "21d60011",
      source: "54fe18e9",
      target: "0ceb61fa",
      label: "NYC restaurant demand increases",
    },
    {
      id: "249d42e3",
      source: "54fe18e9",
      target: "6ca1935b",
      label: "Increased tourism from NYC",
    },
    {
      id: "f521702f",
      source: "54fe18e9",
      target: "8349af17",
      label: "NYC restaurant demand for artisanal goods",
    },
    {
      id: "7cb7c428",
      source: "b400af09",
      target: "04c0fc95",
      label: "Increased demand",
    },
    {
      id: "4e63ca86",
      source: "b400af09",
      target: "190803d1",
      label: "Fundraising boost",
    },
    {
      id: "54c0a095",
      source: "b400af09",
      target: "4b95a493",
      label: "More visitors",
    },
    {
      id: "097bda10",
      source: "0453e038",
      target: "6524ec7b",
      label: "Increased Demand",
    },
    {
      id: "d65b01d2",
      source: "0453e038",
      target: "e9e03151",
      label: "Heightened Threats",
    },
    {
      id: "1a439e98",
      source: "0453e038",
      target: "505c1512",
      label: "Altered Routes",
    },
    {
      id: "a6aa3418",
      source: "e9e03151",
      target: "17b9f582",
      label: "Increased security vulnerability",
    },
    {
      id: "5e17b391",
      source: "e9e03151",
      target: "65955146",
      label: "Disruption from cyberattacks",
    },
    {
      id: "820b90a9",
      source: "e9e03151",
      target: "aaf46eb2",
      label: "Data breaches and service outages",
    },
    {
      id: "000516e2",
      source: "112d2eb2",
      target: "5b70129b",
      label: "Increased trade with Europe",
    },
    {
      id: "2dfec1b5",
      source: "112d2eb2",
      target: "048eb847",
      label: "Shift in global trade patterns",
    },
    {
      id: "79daca98",
      source: "112d2eb2",
      target: "d75a2447",
      label: "Changes in global energy demand",
    },
    {
      id: "9e7648fe",
      source: "112d2eb2",
      target: "8f0979ea",
      label: "Increased travel restrictions",
    },
    {
      id: "b4eca665",
      source: "112d2eb2",
      target: "ba9a5175",
      label: "New EU trade agreements",
    },
    {
      id: "69aeaef5",
      source: "112d2eb2",
      target: "4b9e9eeb",
      label: "Changes in EU trade policies",
    },
    {
      id: "87f34290",
      source: "5b70129b",
      target: "bd1fdd46",
      label: "European Banks' Contagion Risk",
    },
    {
      id: "cf0832a4",
      source: "5b70129b",
      target: "2dddf59e",
      label: "Reduced Economic Confidence",
    },
    {
      id: "75312726",
      source: "5b70129b",
      target: "0f10c399",
      label: "Credit Crunch and Downturn",
    },
    {
      id: "3444e686",
      source: "0f10c399",
      target: "c4b38089",
      label: "Expanded construction demand",
    },
    {
      id: "eb51073e",
      source: "0f10c399",
      target: "f877dd12",
      label: "Increased demand for materials",
    },
    {
      id: "acb0d14f",
      source: "0f10c399",
      target: "cdaa2d25",
      label: "Job opportunities creation",
    },
    {
      id: "33b31a88",
      source: "048eb847",
      target: "02cde668",
      label: "Increased reliance on Asian goods",
    },
    {
      id: "5d8fbeb4",
      source: "048eb847",
      target: "9fc8d44d",
      label: "Competition from Asian supply chains",
    },
    {
      id: "b73138d5",
      source: "048eb847",
      target: "669850c0",
      label: "Access to Asian components",
    },
    {
      id: "e4cf26c8",
      source: "02cde668",
      target: "26c53b16",
      label: "Increased investment opportunities",
    },
    {
      id: "176eb2b3",
      source: "02cde668",
      target: "ab92ee08",
      label: "New supply source",
    },
    {
      id: "fbbeb12b",
      source: "02cde668",
      target: "baeea9ea",
      label: "Competition and collaboration",
    },
    {
      id: "1cebeac9",
      source: "9fc8d44d",
      target: "500b96f7",
      label: "Job creation and rights",
    },
    {
      id: "520a1204",
      source: "9fc8d44d",
      target: "79b151f6",
      label: "New market opportunities",
    },
    {
      id: "734ef549",
      source: "9fc8d44d",
      target: "ee1a943e",
      label: "Trade flow adjustments",
    },
    {
      id: "5ed54054",
      source: "d75a2447",
      target: "83d4a932",
      label: "Increased global demand competition",
    },
    {
      id: "86ce8b84",
      source: "d75a2447",
      target: "a8733396",
      label: "Disrupted cattle feed supply chains",
    },
    {
      id: "061aa327",
      source: "d75a2447",
      target: "20b54d7c",
      label: "Rise in feed costs globally",
    },
    {
      id: "166ad93c",
      source: "a8733396",
      target: "779268ce",
      label: "Supply chain adjustments",
    },
    {
      id: "9334fa8b",
      source: "a8733396",
      target: "86baccbe",
      label: "Promote alternative proteins",
    },
    {
      id: "5a66ab9b",
      source: "a8733396",
      target: "405a8517",
      label: "Pressure sustainable practices",
    },
    {
      id: "68925e28",
      source: "20b54d7c",
      target: "9c195fc2",
      label: "Increased Indian Poultry Demand",
    },
    {
      id: "145f64d5",
      source: "20b54d7c",
      target: "2c4bb648",
      label: "Boosted Poultry Industry Supply Chain",
    },
    {
      id: "978a4284",
      source: "20b54d7c",
      target: "a8a32769",
      label: "Diversified Indian Agri-Industry Exports",
    },
    {
      id: "cc84faed",
      source: "8f0979ea",
      target: "a4939166",
      label: "Increased passenger demand",
    },
    {
      id: "1c23d9e9",
      source: "8f0979ea",
      target: "52714f24",
      label: "Boost in occupancy rates",
    },
    {
      id: "b2775637",
      source: "8f0979ea",
      target: "c9053a7f",
      label: "Higher tourist visits",
    },
    {
      id: "f0e2e3fb",
      source: "ba9a5175",
      target: "77513c3f",
      label: "partnering with Indian startups",
    },
    {
      id: "577c3103",
      source: "ba9a5175",
      target: "a3f59b62",
      label: "collaborating on renewable energy",
    },
    {
      id: "950fab49",
      source: "ba9a5175",
      target: "edde635c",
      label: "adopting AI-powered financial solutions",
    },
    {
      id: "9613cfb8",
      source: "4b9e9eeb",
      target: "68dd2cb0",
      label: "Supply Chain Disruption",
    },
    {
      id: "2dfad808",
      source: "4b9e9eeb",
      target: "e43b7f54",
      label: "Increased Soybean Demand",
    },
    {
      id: "5780fd6a",
      source: "4b9e9eeb",
      target: "da3f93a0",
      label: "Market Competition Increase",
    },
    {
      id: "3dcf0d28",
      source: "4373125c",
      target: "8787a3f2",
      label: "Increased investment and funding",
    },
    {
      id: "0f5330ae",
      source: "4373125c",
      target: "37c5c3e3",
      label: "Promotion of Chinese tech",
    },
    {
      id: "3402733a",
      source: "4373125c",
      target: "260ad8e8",
      label: "Access to Chinese capital",
    },
    {
      id: "65cb6f15",
      source: "37c5c3e3",
      target: "80e12e57",
      label: "Standardized aviation protocols",
    },
    {
      id: "565c7d03",
      source: "37c5c3e3",
      target: "7ec5d562",
      label: "Unified booking systems adopted",
    },
    {
      id: "268456ca",
      source: "37c5c3e3",
      target: "27cafa83",
      label: "Secure blockchain transactions ensured",
    },
    {
      id: "0f92428e",
      source: "80e12e57",
      target: "c9dd8263",
      label: "Airplane orders affected",
    },
    {
      id: "06d6e345",
      source: "80e12e57",
      target: "6c9d8bca",
      label: "Competition increased",
    },
    {
      id: "97dc70ed",
      source: "80e12e57",
      target: "526fb667",
      label: "Market share threatened",
    },
    {
      id: "80e01626",
      source: "260ad8e8",
      target: "75565fb8",
      label: "Increased demand for specialty",
    },
    {
      id: "d94d6e29",
      source: "260ad8e8",
      target: "f3e7a698",
      label: "Access to global markets",
    },
    {
      id: "8ade97b3",
      source: "260ad8e8",
      target: "d3d3bf2d",
      label: "New export opportunities created",
    },
    {
      id: "1f213fd2",
      source: "75565fb8",
      target: "88f86e9b",
      label: "Coffee prices affect supply chain",
    },
    {
      id: "fee8a566",
      source: "75565fb8",
      target: "34c99992",
      label: "Kenyan coffee impacts French baking",
    },
    {
      id: "6134a544",
      source: "75565fb8",
      target: "7cd6a08a",
      label: "Coffee demand boosts luxury goods",
    },
    {
      id: "b1bdaf4c",
      source: "d3d3bf2d",
      target: "95723dd4",
      label: "Similar crafts",
    },
    {
      id: "c42e4fe0",
      source: "d3d3bf2d",
      target: "48e6b3b0",
      label: "Competition increases",
    },
    {
      id: "f25a4c98",
      source: "d3d3bf2d",
      target: "61740554",
      label: "Inspiration shared",
    },
    {
      id: "c221f55a",
      source: "bf0cf11c",
      target: "e924958e",
      label: "Increased Demographic Shifts",
    },
    {
      id: "941ab466",
      source: "bf0cf11c",
      target: "4dc7f700",
      label: "Workforce Disruptions Expected",
    },
    {
      id: "3aba802b",
      source: "bf0cf11c",
      target: "28a4295a",
      label: "Infrastructure Strains Anticipated",
    },
    {
      id: "f6684a58",
      source: "e924958e",
      target: "8d3e8cc8",
      label: "Crop insurance rates increase",
    },
    {
      id: "6f792cbe",
      source: "e924958e",
      target: "0eb4c512",
      label: "Risk assessment changes",
    },
    {
      id: "00cb9e49",
      source: "e924958e",
      target: "71fae84f",
      label: "Annuity policy changes",
    },
    {
      id: "77dc501f",
      source: "0eb4c512",
      target: "fbea6d8f",
      label: "Loss of US Support",
    },
    {
      id: "45325a91",
      source: "0eb4c512",
      target: "8296d128",
      label: "Decreased Demand",
    },
    {
      id: "93c4b32a",
      source: "0eb4c512",
      target: "ec6157e1",
      label: "Increased Competition",
    },
    {
      id: "b1ac3331",
      source: "4dc7f700",
      target: "37b4f180",
      label: "Labor cost fluctuations",
    },
    {
      id: "3903a454",
      source: "4dc7f700",
      target: "2ab2200d",
      label: "Employment opportunities",
    },
    {
      id: "4fe80ae8",
      source: "4dc7f700",
      target: "26f53c0c",
      label: "Labor supply changes",
    },
    {
      id: "3b5be584",
      source: "37b4f180",
      target: "769cb503",
      label: "Economic Stability",
    },
    {
      id: "886ed828",
      source: "37b4f180",
      target: "a13aa3e4",
      label: "Supply Chain",
    },
    {
      id: "eb566592",
      source: "37b4f180",
      target: "8041f626",
      label: "Sales Increase",
    },
    {
      id: "78d1d6c8",
      source: "2ab2200d",
      target: "d57e1518",
      label: "Reduced federal funding",
    },
    {
      id: "61aa4ee4",
      source: "2ab2200d",
      target: "d05ea32e",
      label: "Shifted agricultural policies",
    },
    {
      id: "1d72e7f6",
      source: "2ab2200d",
      target: "68d6a93d",
      label: "Changes in broadcasting regulations",
    },
    {
      id: "d836f4e4",
      source: "d57e1518",
      target: "1a8a2a2a",
      label: "Preservation funding shortages increase",
    },
    {
      id: "9a3337c8",
      source: "d57e1518",
      target: "0eea9919",
      label: "New supply chain regulations arise",
    },
    {
      id: "6eccf433",
      source: "d57e1518",
      target: "19a9d1d5",
      label: "Disaster relief funding allocation changes",
    },
    {
      id: "f1e781d0",
      source: "26f53c0c",
      target: "c508ec76",
      label: "Increased demand for crops",
    },
    {
      id: "23b71e84",
      source: "26f53c0c",
      target: "fdca4ca3",
      label: "New market opportunities",
    },
    {
      id: "9abee2a8",
      source: "26f53c0c",
      target: "de54984a",
      label: "Expanded product range",
    },
    {
      id: "cfd89e84",
      source: "28a4295a",
      target: "cd8cbba8",
      label: "New trade routes development",
    },
    {
      id: "c5ea4728",
      source: "28a4295a",
      target: "8d3444f8",
      label: "New infrastructure for trade",
    },
    {
      id: "c537b57c",
      source: "28a4295a",
      target: "c8233f31",
      label: "Urban renewal programs creation",
    },
    {
      id: "61d31178",
      source: "cd8cbba8",
      target: "a5d553bf",
      label: "Cloud Service Cost Reduction",
    },
    {
      id: "b909e591",
      source: "cd8cbba8",
      target: "22705924",
      label: "User-Generated Content Optimization",
    },
    {
      id: "4c632ed9",
      source: "cd8cbba8",
      target: "48860769",
      label: "Local Tourism Revenue Increase",
    },
    {
      id: "c66f91da",
      source: "8d3444f8",
      target: "51ad0fd5",
      label: "Indian Textile Manufacturers alternatives",
    },
    {
      id: "0ffbd234",
      source: "8d3444f8",
      target: "36f2540a",
      label: "Impact on global supply chains",
    },
    {
      id: "06536c88",
      source: "8d3444f8",
      target: "89a5b604",
      label: "Global economic instability concerns",
    },
    {
      id: "869bf342",
      source: "c8233f31",
      target: "f9516c9b",
      label: "Southeast Asian Street Food Interest",
    },
    {
      id: "05434893",
      source: "c8233f31",
      target: "3c4e4463",
      label: "Cultural Exchange and Inspiration",
    },
    {
      id: "8de733d3",
      source: "c8233f31",
      target: "06003f97",
      label: "Increased Property Value and Investment",
    },
    {
      id: "1bd07663",
      source: "49e6c839",
      target: "d396a69a",
      label: "Changed trade policies",
    },
    {
      id: "230f8d38",
      source: "49e6c839",
      target: "cb5b70b3",
      label: "Shifted tourist preferences",
    },
    {
      id: "f2ec5322",
      source: "49e6c839",
      target: "9c695b7a",
      label: "Investor confidence changes",
    },
    {
      id: "a6e867b1",
      source: "d396a69a",
      target: "11512094",
      label: "Agricultural exports increase demand",
    },
    {
      id: "b1b97916",
      source: "d396a69a",
      target: "933503d0",
      label: "Jobs created by exports",
    },
    {
      id: "b91eca58",
      source: "d396a69a",
      target: "f6a11aab",
      label: "Increased cargo transportation needs",
    },
    {
      id: "ae10a119",
      source: "933503d0",
      target: "adf3999a",
      label: "outsourcing rural jobs affected",
    },
    {
      id: "0fad102f",
      source: "933503d0",
      target: "0b3325a4",
      label: "price fluctuations from trade",
    },
    {
      id: "3a10508a",
      source: "933503d0",
      target: "fde39bd4",
      label: "reduced profit margins expected",
    },
    {
      id: "ee12830c",
      source: "f6a11aab",
      target: "11b01920",
      label: "Disruption in global supply chain",
    },
    {
      id: "5605dfae",
      source: "f6a11aab",
      target: "aaba4bf6",
      label: "Changes in global demand patterns",
    },
    {
      id: "a8d0a1cd",
      source: "f6a11aab",
      target: "6d8da00d",
      label: "Shifts in global energy policies",
    },
    {
      id: "bc6f4cf0",
      source: "cb5b70b3",
      target: "5d0e35ee",
      label: "Increased travel demand",
    },
    {
      id: "1042e56a",
      source: "cb5b70b3",
      target: "927de039",
      label: "Attraction for tourists",
    },
    {
      id: "a7f2c780",
      source: "cb5b70b3",
      target: "1e1141a5",
      label: "Promotes eco-friendly travel",
    },
    {
      id: "daa59c40",
      source: "927de039",
      target: "a6ae2092",
      label: "Increased visitor spending",
    },
    {
      id: "0203aedd",
      source: "927de039",
      target: "f674a851",
      label: "Sales boost from festival",
    },
    {
      id: "d4a164df",
      source: "927de039",
      target: "eb07c4dd",
      label: "Higher demand during festivals",
    },
    {
      id: "84dd1a05",
      source: "371ca143",
      target: "56d06fa6",
      label: "Regulatory changes expected",
    },
    {
      id: "d8bb68e8",
      source: "371ca143",
      target: "670ce702",
      label: "New investigative priorities",
    },
    {
      id: "66241f9d",
      source: "371ca143",
      target: "2e17687f",
      label: "Potential appeals influx",
    },
    {
      id: "c5983147",
      source: "56d06fa6",
      target: "425e1916",
      label: "Contract Losses Looming Ahead",
    },
    {
      id: "179d99f6",
      source: "56d06fa6",
      target: "77d3cf3e",
      label: "Regulatory Rollbacks Expected Soon",
    },
    {
      id: "6deeb4cc",
      source: "56d06fa6",
      target: "f501cd94",
      label: "Project Funding Uncertainty Rises",
    },
    {
      id: "1f5359c2",
      source: "425e1916",
      target: "ce19ebfd",
      label: "Increased Donations and Funding",
    },
    {
      id: "a4d44143",
      source: "425e1916",
      target: "d2aa0ce8",
      label: "Boost in Sales and Patronage",
    },
    {
      id: "9f050f06",
      source: "425e1916",
      target: "3b50fa22",
      label: "Growing Demand for Programs",
    },
    {
      id: "4059c480",
      source: "ce19ebfd",
      target: "83239454",
      label: "Increased demand",
    },
    {
      id: "005d3764",
      source: "ce19ebfd",
      target: "04a6859e",
      label: "Decreased values",
    },
    {
      id: "4454b3d1",
      source: "ce19ebfd",
      target: "e0ec6c8d",
      label: "Increased utilization",
    },
    {
      id: "991b6b5e",
      source: "83239454",
      target: "30902d10",
      label: "Increased demand",
    },
    {
      id: "c9e573e5",
      source: "83239454",
      target: "6facc714",
      label: "More local options",
    },
    {
      id: "5e662990",
      source: "83239454",
      target: "1a1e5d44",
      label: "Customized services",
    },
    {
      id: "a6c3a0d6",
      source: "3b50fa22",
      target: "f350bab6",
      label: "Increased foot traffic and patronage",
    },
    {
      id: "89bddb2d",
      source: "3b50fa22",
      target: "0d42b27f",
      label: "Shared space and collaboration",
    },
    {
      id: "96380f1e",
      source: "3b50fa22",
      target: "bda9c610",
      label: "Access to learning resources",
    },
    {
      id: "c19a8d49",
      source: "77d3cf3e",
      target: "03640cdc",
      label: "Increased international scrutiny",
    },
    {
      id: "4b6ddd86",
      source: "77d3cf3e",
      target: "33a86805",
      label: "Stricter environmental regulations",
    },
    {
      id: "e0ce328c",
      source: "77d3cf3e",
      target: "c15c42d2",
      label: "Increased conservation efforts",
    },
    {
      id: "8b79a0d0",
      source: "03640cdc",
      target: "f51ca756",
      label: "Increased demand for whaling gear",
    },
    {
      id: "addfcde7",
      source: "03640cdc",
      target: "9a10ab5a",
      label: "Economic boost through whaling",
    },
    {
      id: "8aa8c7f4",
      source: "03640cdc",
      target: "84ea1a14",
      label: "Increased advocacy against whaling",
    },
    {
      id: "c89eef17",
      source: "9a10ab5a",
      target: "574f407e",
      label: "Loss of Whale Populations",
    },
    {
      id: "08663886",
      source: "9a10ab5a",
      target: "e8793f02",
      label: "Restrictions on Traditional Hunting",
    },
    {
      id: "873b711b",
      source: "9a10ab5a",
      target: "6c290a7b",
      label: "Increased Protection for Whales",
    },
    {
      id: "ec7bb4a6",
      source: "f501cd94",
      target: "ea8460d2",
      label: "Laundered funds at risk",
    },
    {
      id: "1f4fe2fa",
      source: "f501cd94",
      target: "21c1e639",
      label: "Decreased demand expected",
    },
    {
      id: "6964b1e6",
      source: "f501cd94",
      target: "8c360f36",
      label: "Sponsorship deals affected",
    },
    {
      id: "786db4d8",
      source: "ea8460d2",
      target: "f2773d41",
      label: "Loss of Russian investments",
    },
    {
      id: "329aaf32",
      source: "ea8460d2",
      target: "5beadaef",
      label: "Disrupted Russian imports",
    },
    {
      id: "f5af32b2",
      source: "ea8460d2",
      target: "4fb3e1fa",
      label: "Reduced Russian wealthy clientele",
    },
    {
      id: "91612391",
      source: "21c1e639",
      target: "aed36fa0",
      label: "Increased Luxury Demand",
    },
    {
      id: "838bada8",
      source: "21c1e639",
      target: "089d38a7",
      label: "Upscale Clientele Increase",
    },
    {
      id: "9621406f",
      source: "21c1e639",
      target: "2e589604",
      label: "Luxury Vacation Packages",
    },
    {
      id: "b6d5259b",
      source: "670ce702",
      target: "75870517",
      label: "Potential property seizures.",
    },
    {
      id: "5115a860",
      source: "670ce702",
      target: "a52352ec",
      label: "Funding eligibility affected.",
    },
    {
      id: "ed93d5b7",
      source: "670ce702",
      target: "13314cab",
      label: "Increased security demands.",
    },
    {
      id: "419ed31a",
      source: "a52352ec",
      target: "2955047f",
      label: "Loss of patronage influence",
    },
    {
      id: "f75c894a",
      source: "a52352ec",
      target: "ca52bae5",
      label: "Decline in high-end consumerism",
    },
    {
      id: "5f6351e7",
      source: "a52352ec",
      target: "5eec396e",
      label: "Reputation damage due to association",
    },
    {
      id: "976f9518",
      source: "2955047f",
      target: "883fea52",
      label: "Increased risk premiums.",
    },
    {
      id: "c85247ec",
      source: "2955047f",
      target: "ea0dbe8a",
      label: "Higher demand for preservation.",
    },
    {
      id: "b1e0e07f",
      source: "2955047f",
      target: "a20e2919",
      label: "Shift to digital transactions.",
    },
    {
      id: "4bc3aea9",
      source: "5eec396e",
      target: "1807b68b",
      label: "Funding Educational Initiatives",
    },
    {
      id: "035970c1",
      source: "5eec396e",
      target: "9a854eff",
      label: "Study Abroad Opportunities",
    },
    {
      id: "477c34b2",
      source: "5eec396e",
      target: "fe5f5ed7",
      label: "Innovation and Research",
    },
    {
      id: "03ebaa38",
      source: "13314cab",
      target: "405873a6",
      label: "Increased security costs",
    },
    {
      id: "775a63b7",
      source: "13314cab",
      target: "3a93ca5a",
      label: "Enhanced security measures",
    },
    {
      id: "61880519",
      source: "13314cab",
      target: "1549985e",
      label: "Personal protection services",
    },
    {
      id: "fe3c2bdc",
      source: "3a93ca5a",
      target: "ff583cd3",
      label: "Increased Tourism Revenue",
    },
    {
      id: "0e9f28d1",
      source: "3a93ca5a",
      target: "96c6444a",
      label: "Increased Demand for Art",
    },
    {
      id: "5b09974a",
      source: "3a93ca5a",
      target: "a75b79b8",
      label: "Enhanced Cultural Understanding",
    },
    {
      id: "32543a59",
      source: "1549985e",
      target: "d8245512",
      label: "Remote workforce affects design teams",
    },
    {
      id: "de4ddf68",
      source: "1549985e",
      target: "60ea81df",
      label: "Remote sales impact artisanal communities",
    },
    {
      id: "9e40983a",
      source: "1549985e",
      target: "2cb373e4",
      label: "Remote workforce affects conservation efforts",
    },
    {
      id: "ea88c18b",
      source: "2e17687f",
      target: "d6e56923",
      label: "Gun Laws and Regulations",
    },
    {
      id: "453a59ef",
      source: "2e17687f",
      target: "5a7914c1",
      label: "Immigration Policy Decisions",
    },
    {
      id: "063e248a",
      source: "2e17687f",
      target: "88c6b1b8",
      label: "Climate Change and Regulations",
    },
    {
      id: "5d6e0af9",
      source: "2e17687f",
      target: "ce2c4a18",
      label: "Tax Policy and Law",
    },
    {
      id: "e7e8b2c0",
      source: "2e17687f",
      target: "06b89fc4",
      label: "Student Loan and Funding",
    },
    {
      id: "d86d65db",
      source: "d6e56923",
      target: "ae64d0c2",
      label: "Decreased Tourist Visits Expected",
    },
    {
      id: "5d546e9e",
      source: "d6e56923",
      target: "3595a854",
      label: "Increased Security Measures Needed",
    },
    {
      id: "4d217dc1",
      source: "d6e56923",
      target: "18fe0f23",
      label: "Decreased Fan Engagement Predicted",
    },
    {
      id: "6343c8e7",
      source: "d6e56923",
      target: "68de0bc2",
      label: "Reduced Room Occupancy Anticipated",
    },
    {
      id: "6844faa9",
      source: "d6e56923",
      target: "a16d4aa8",
      label: "Decreased Sales Expected Overall",
    },
    {
      id: "3943e3db",
      source: "d6e56923",
      target: "10a054d5",
      label: "Increased Security Costs Forecasted",
    },
    {
      id: "9e92c5a7",
      source: "d6e56923",
      target: "bd4245fc",
      label: "Decreased Ticket Sales Predicted",
    },
    {
      id: "85f4180b",
      source: "18fe0f23",
      target: "e7570d8b",
      label: "Increased local event sponsorships",
    },
    {
      id: "d4e02298",
      source: "18fe0f23",
      target: "a6cbed6f",
      label: "Author appearances and book signings",
    },
    {
      id: "ac37365f",
      source: "18fe0f23",
      target: "e5e0908f",
      label: "Team-branded merchandise sales opportunities",
    },
    {
      id: "87b1c7f2",
      source: "bd4245fc",
      target: "fd5d9352",
      label: "Potential loss of investments",
    },
    {
      id: "f2fe5609",
      source: "bd4245fc",
      target: "55d7478a",
      label: "Increased uncertainty in markets",
    },
    {
      id: "6887e2b0",
      source: "bd4245fc",
      target: "680dd544",
      label: "Potential loss of global partnerships",
    },
    {
      id: "6e33a6a4",
      source: "5a7914c1",
      target: "027e55ae",
      label: "Immigration agency hiring restrictions",
    },
    {
      id: "079439af",
      source: "5a7914c1",
      target: "20318b3d",
      label: "Increased housing demand uncertainty",
    },
    {
      id: "a5076a5c",
      source: "5a7914c1",
      target: "107a4fd1",
      label: "Potential labor shortages disruptions",
    },
    {
      id: "96ef6bc9",
      source: "107a4fd1",
      target: "09d29e14",
      label: "Disrupted Logistics",
    },
    {
      id: "c673aaa3",
      source: "107a4fd1",
      target: "17d4c87b",
      label: "Supply Chain Disruptions",
    },
    {
      id: "99558912",
      source: "107a4fd1",
      target: "41223622",
      label: "Inventory Shortages",
    },
    {
      id: "125f6868",
      source: "88c6b1b8",
      target: "9432dd71",
      label: "Stricter carbon emission regulations enforced.",
    },
    {
      id: "0bb2a857",
      source: "88c6b1b8",
      target: "51c51a0e",
      label: "Sustainable farming practices mandated.",
    },
    {
      id: "b217df1c",
      source: "88c6b1b8",
      target: "012ec649",
      label: "Emission standards tightened significantly.",
    },
    {
      id: "1fee154b",
      source: "ce2c4a18",
      target: "616aeb39",
      label: "Regulatory Changes Ahead",
    },
    {
      id: "6f13e28a",
      source: "ce2c4a18",
      target: "a32d8ef3",
      label: "Increased Business Access",
    },
    {
      id: "96a153cc",
      source: "ce2c4a18",
      target: "5bfe6114",
      label: "Shift in Lending Practices",
    },
    {
      id: "c487264d",
      source: "616aeb39",
      target: "010c4239",
      label: "Shift to Authenticity Trend",
    },
    {
      id: "e2904604",
      source: "616aeb39",
      target: "205dc6b9",
      label: "Franchise Industry's Environmental Impact",
    },
    {
      id: "2d3edfdc",
      source: "616aeb39",
      target: "f7b96d6b",
      label: "Franchise Lobbying for Favorable Policies",
    },
    {
      id: "3fc87b0b",
      source: "a32d8ef3",
      target: "30eb92d2",
      label: "New market opportunities emerge",
    },
    {
      id: "98ec888e",
      source: "a32d8ef3",
      target: "cd09c387",
      label: "Diversified production and sales",
    },
    {
      id: "43015e3d",
      source: "a32d8ef3",
      target: "33c1f890",
      label: "Increased target market penetration",
    },
    {
      id: "735ffea9",
      source: "5bfe6114",
      target: "e7787dfc",
      label: "Increased Credit Union Competition",
    },
    {
      id: "c42ffd55",
      source: "5bfe6114",
      target: "f1434652",
      label: "Access to Financial Services",
    },
    {
      id: "2bf38221",
      source: "5bfe6114",
      target: "9e983e51",
      label: "Alternative Financial Options",
    },
    {
      id: "e8bb1cdd",
      source: "06b89fc4",
      target: "5db4f67a",
      label: "Global Commodity Price Volatility",
    },
    {
      id: "b24290ff",
      source: "06b89fc4",
      target: "999995f3",
      label: "Global Oil Market Uncertainty",
    },
    {
      id: "c36fad9d",
      source: "06b89fc4",
      target: "9e7dabce",
      label: "Global Commodity Price Fluctuations",
    },
    {
      id: "cad4134c",
      source: "06b89fc4",
      target: "ca3f541e",
      label: "Global Economic Instability",
    },
    {
      id: "82cd2747",
      source: "06b89fc4",
      target: "ded262e3",
      label: "Global Commodity Price Volatility",
    },
    {
      id: "5f617063",
      source: "06b89fc4",
      target: "950d01c2",
      label: "Global Economic Uncertainty",
    },
    {
      id: "93ea74f3",
      source: "999995f3",
      target: "a14e055d",
      label: "Financial ties with Saudi Arabia",
    },
    {
      id: "1103fa99",
      source: "999995f3",
      target: "b57b29c3",
      label: "Strategic partnership with Saudi Arabia",
    },
    {
      id: "93952c33",
      source: "999995f3",
      target: "7927a06e",
      label: "Aircraft sales to Saudi Royal Family",
    },
    {
      id: "9fbf71c8",
      source: "a14e055d",
      target: "1ddccbf2",
      label: "Greek Economic Stability",
    },
    {
      id: "7d716c8a",
      source: "a14e055d",
      target: "dfcdefa6",
      label: "Dependence on Piraeus Bank",
    },
    {
      id: "d44ea2c0",
      source: "a14e055d",
      target: "7b4573e2",
      label: "Potential Economic Instability",
    },
    {
      id: "45457f6b",
      source: "915ea5f0",
      target: "637ea5af",
      label: "Influences user engagement",
    },
    {
      id: "bcb8ef3b",
      source: "915ea5f0",
      target: "005a780e",
      label: "Shapes advocacy efforts",
    },
    {
      id: "10ba633e",
      source: "915ea5f0",
      target: "b936ed33",
      label: "Alters curriculum focus",
    },
    {
      id: "d3b7c26f",
      source: "637ea5af",
      target: "7fd5a683",
      label: "Increased anxiety reports",
    },
    {
      id: "b193c0c1",
      source: "637ea5af",
      target: "6eb08bc0",
      label: "Data breach risks",
    },
    {
      id: "a6e73a48",
      source: "637ea5af",
      target: "792d605e",
      label: "Information literacy",
    },
    {
      id: "114ff6f4",
      source: "7fd5a683",
      target: "e562e533",
      label: "Increased tourism regulations",
    },
    {
      id: "ef9b1e86",
      source: "7fd5a683",
      target: "9e8b6c23",
      label: "Stress and financial burden",
    },
    {
      id: "5e2d5dac",
      source: "7fd5a683",
      target: "718760f9",
      label: "Mental health inspiration and funding",
    },
    {
      id: "a1cb566a",
      source: "6eb08bc0",
      target: "c1f5a776",
      label: "Increased regulatory scrutiny",
    },
    {
      id: "2b33dc5f",
      source: "6eb08bc0",
      target: "319d476c",
      label: "Potential reputational damage",
    },
    {
      id: "efdc492c",
      source: "6eb08bc0",
      target: "1b402ed9",
      label: "Potential trade disruptions",
    },
    {
      id: "3c97c57d",
      source: "792d605e",
      target: "e2a08b94",
      label: "Increased Student Anxiety",
    },
    {
      id: "559b3aee",
      source: "792d605e",
      target: "6c7cf5bc",
      label: "Policy Changes Expected",
    },
    {
      id: "e72ede16",
      source: "792d605e",
      target: "95541b73",
      label: "Community Engagement Shifts",
    },
    {
      id: "9149d0f4",
      source: "005a780e",
      target: "07cf724a",
      label: "Loss of Government Contracts",
    },
    {
      id: "eaa8976e",
      source: "005a780e",
      target: "a486662d",
      label: "Shift in Federal Funding Priorities",
    },
    {
      id: "54900173",
      source: "005a780e",
      target: "4d4fbaa0",
      label: "Increased Deportation Enforcement",
    },
    {
      id: "95383d01",
      source: "005a780e",
      target: "14552054",
      label: "Relaxation of Environmental Regulations",
    },
    {
      id: "5260e8f4",
      source: "07cf724a",
      target: "3b90558f",
      label: "Increased loan applications",
    },
    {
      id: "2a883869",
      source: "07cf724a",
      target: "78b6ef40",
      label: "Shift in commercial property",
    },
    {
      id: "c302c05e",
      source: "07cf724a",
      target: "4b41128d",
      label: "New job creation initiatives",
    },
    {
      id: "8efb329a",
      source: "3b90558f",
      target: "9b2ead63",
      label: "Credit access changes",
    },
    {
      id: "ad8fb065",
      source: "3b90558f",
      target: "3cbbc857",
      label: "Local investment shifts",
    },
    {
      id: "f08d1f50",
      source: "3b90558f",
      target: "9fcf0dd9",
      label: "Community funding decreases",
    },
    {
      id: "f5494e79",
      source: "78b6ef40",
      target: "78af33fc",
      label: "Mortgage Rates Change",
    },
    {
      id: "f72af92b",
      source: "78b6ef40",
      target: "7aa53786",
      label: "Housing Demand Shifts",
    },
    {
      id: "8925ac2d",
      source: "78b6ef40",
      target: "eb258447",
      label: "Mortgage Loan Defaults",
    },
    {
      id: "6d646367",
      source: "eb258447",
      target: "8432e977",
      label: "Access to credit changes",
    },
    {
      id: "3d74ceb8",
      source: "eb258447",
      target: "45f1fa81",
      label: "Funding and investment shifts",
    },
    {
      id: "4b4e5e6f",
      source: "4b41128d",
      target: "3a0b1c96",
      label: "Increased funding and support",
    },
    {
      id: "445d72c6",
      source: "4b41128d",
      target: "4ec555be",
      label: "Expanding service networks",
    },
    {
      id: "d4b7d40d",
      source: "4b41128d",
      target: "bcad7206",
      label: "Enhanced job training",
    },
    {
      id: "223500e4",
      source: "a486662d",
      target: "2a7cd29f",
      label: "Tariff changes and economic uncertainty",
    },
    {
      id: "76bc1f32",
      source: "a486662d",
      target: "0a89f103",
      label: "Changes in regulatory landscape",
    },
    {
      id: "e446a4b4",
      source: "a486662d",
      target: "520f3b30",
      label: "Tax policy and economic instability",
    },
    {
      id: "b738a05c",
      source: "2a7cd29f",
      target: "4c69a654",
      label: "Fuel price fluctuations affecting profitability",
    },
    {
      id: "022b0484",
      source: "2a7cd29f",
      target: "e2cc1813",
      label: "Crude oil price spike impacting operations",
    },
    {
      id: "cb7ec9ab",
      source: "2a7cd29f",
      target: "ea53e777",
      label: "Travel demand influenced by commodity prices",
    },
    {
      id: "c8054fa0",
      source: "2a7cd29f",
      target: "88a0cb6b",
      label: "Commodity price fluctuations affecting travel costs",
    },
    {
      id: "b162efd4",
      source: "2a7cd29f",
      target: "82115afa",
      label: "Commodity price surge increasing operating costs",
    },
    {
      id: "f5c97f86",
      source: "2a7cd29f",
      target: "1dd396cc",
      label: "Rising raw material costs affecting products",
    },
    {
      id: "eb6e1670",
      source: "2a7cd29f",
      target: "bda8b8a9",
      label: "Increased fuel costs impacting launch costs",
    },
    {
      id: "9d063936",
      source: "2a7cd29f",
      target: "59632d96",
      label: "Commodity price volatility affecting trading volumes",
    },
    {
      id: "50bd1407",
      source: "2a7cd29f",
      target: "152d6478",
      label: "Shift towards renewable energy affecting demand",
    },
    {
      id: "1eadd81c",
      source: "2a7cd29f",
      target: "f165293f",
      label: "Increased demand driven by commodity prices",
    },
    {
      id: "83d99c6f",
      source: "2a7cd29f",
      target: "01083c6a",
      label: "Commodity price fluctuations affecting lending rates",
    },
    {
      id: "cffed4b3",
      source: "2a7cd29f",
      target: "69e7c6b6",
      label: "Commodity price surge affecting construction costs",
    },
    {
      id: "455fcab9",
      source: "520f3b30",
      target: "25605eb5",
      label: "Potential funding restrictions",
    },
    {
      id: "db4f9a07",
      source: "520f3b30",
      target: "189c1787",
      label: "Trade route instability concerns",
    },
    {
      id: "1ad0bc90",
      source: "520f3b30",
      target: "4d8e18da",
      label: "Global market price fluctuations",
    },
    {
      id: "0fca940a",
      source: "4d4fbaa0",
      target: "31905195",
      label: "Immigrants in agricultural labor",
    },
    {
      id: "18217d35",
      source: "4d4fbaa0",
      target: "fe8eeb59",
      label: "Diverse art and cultural influences",
    },
    {
      id: "419623f0",
      source: "4d4fbaa0",
      target: "a45f826b",
      label: "Immigrant-owned restaurants and food",
    },
    {
      id: "080d97b3",
      source: "4d4fbaa0",
      target: "2fe0f9f3",
      label: "Global fashion trends and designs",
    },
    {
      id: "ffa9f37b",
      source: "4d4fbaa0",
      target: "b8f86378",
      label: "Diverse musical and artistic talents",
    },
    {
      id: "870cb64b",
      source: "4d4fbaa0",
      target: "fa478b73",
      label: "International player recruitment and talent",
    },
    {
      id: "81bae8e8",
      source: "4d4fbaa0",
      target: "da57c84d",
      label: "Global financial expertise and networks",
    },
    {
      id: "9190a3c8",
      source: "4d4fbaa0",
      target: "7e0c6e3e",
      label: "Immigrant-owned renewable energy companies",
    },
    {
      id: "1aca758f",
      source: "4d4fbaa0",
      target: "99241bbd",
      label: "Global perspectives and expertise",
    },
    {
      id: "636a266d",
      source: "31905195",
      target: "f0a6f583",
      label: "Increased coffee demand",
    },
    {
      id: "cce18ce2",
      source: "31905195",
      target: "8bac3831",
      label: "Higher coffee prices",
    },
    {
      id: "bbfac0fc",
      source: "31905195",
      target: "ad7c3d4e",
      label: "Flavor profile changes",
    },
    {
      id: "dc7a8bc6",
      source: "fe8eeb59",
      target: "f7299a74",
      label: "Increased Cultural Exchange",
    },
    {
      id: "34223852",
      source: "fe8eeb59",
      target: "91a97cbf",
      label: "Festive Cultural Expression",
    },
    {
      id: "1465ea06",
      source: "fe8eeb59",
      target: "565b935b",
      label: "Style and Cultural Identity",
    },
    {
      id: "82f8b1dd",
      source: "91a97cbf",
      target: "b4dea3a9",
      label: "Cultural Exchange",
    },
    {
      id: "78263bd1",
      source: "91a97cbf",
      target: "b2bf787c",
      label: "Tourist Inquiries",
    },
    {
      id: "eb7fda3f",
      source: "91a97cbf",
      target: "2d244cb5",
      label: "Cultural Inspiration",
    },
    {
      id: "ac8e2d27",
      source: "da57c84d",
      target: "178daaad",
      label: "Market Volatility Affects Returns",
    },
    {
      id: "f8066b03",
      source: "da57c84d",
      target: "890ad691",
      label: "Alternative Finance Options",
    },
    {
      id: "2425ce39",
      source: "da57c84d",
      target: "e35e446f",
      label: "Access to Capital Changes",
    },
    {
      id: "e142b918",
      source: "890ad691",
      target: "ff623572",
      label: "Loss of traditional markets",
    },
    {
      id: "0de3efb7",
      source: "890ad691",
      target: "a8b2c791",
      label: "Increased competition globally",
    },
    {
      id: "0b76bf67",
      source: "890ad691",
      target: "e3980122",
      label: "Shift to Islamic finance",
    },
    {
      id: "0fb0f370",
      source: "7e0c6e3e",
      target: "67f9b5e7",
      label: "Increased influence opportunities",
    },
    {
      id: "c8d7cb7e",
      source: "7e0c6e3e",
      target: "6f095ab9",
      label: "New revenue streams open",
    },
    {
      id: "de3d1248",
      source: "7e0c6e3e",
      target: "b862bcc2",
      label: "Access to clean energy",
    },
    {
      id: "1485fa2c",
      source: "6f095ab9",
      target: "922042a1",
      label: "Access to renewable energy",
    },
    {
      id: "155f16a4",
      source: "6f095ab9",
      target: "87e79d4b",
      label: "Empowerment through community ownership",
    },
    {
      id: "07f2b854",
      source: "6f095ab9",
      target: "7c3b8eec",
      label: "Support for sustainable energy projects",
    },
    {
      id: "8fe97838",
      source: "14552054",
      target: "9a38b175",
      label: "Regulation Changes",
    },
    {
      id: "b77f7951",
      source: "14552054",
      target: "0de287a4",
      label: "Increased Funding",
    },
    {
      id: "66597165",
      source: "14552054",
      target: "05daaf16",
      label: "New Policies",
    },
    {
      id: "cc595867",
      source: "9a38b175",
      target: "5172e789",
      label: "Price fluctuations affect exports",
    },
    {
      id: "139021e1",
      source: "9a38b175",
      target: "544fa0b0",
      label: "Agricultural subsidies affected",
    },
    {
      id: "2d9a7bb8",
      source: "9a38b175",
      target: "dd00ea6b",
      label: "Trade routes and tariffs impacted",
    },
    {
      id: "63026c3c",
      source: "0de287a4",
      target: "647cb665",
      label: "Shifting energy sources",
    },
    {
      id: "10385c12",
      source: "0de287a4",
      target: "5400d33d",
      label: "Renewable energy adoption",
    },
    {
      id: "6f884ecf",
      source: "0de287a4",
      target: "716613a6",
      label: "Green technology investment",
    },
    {
      id: "b5e49ec1",
      source: "b936ed33",
      target: "9515f756",
      label: "Increased Education Opportunities",
    },
    {
      id: "0a634dce",
      source: "b936ed33",
      target: "0508680f",
      label: "Access to Skilled Labor",
    },
    {
      id: "52b2f6b0",
      source: "b936ed33",
      target: "f59330ed",
      label: "Increased Sustainability Education",
    },
    {
      id: "13423843",
      source: "9515f756",
      target: "04a00063",
      label: "Labor shortages, skill mismatches",
    },
    {
      id: "04979ee7",
      source: "9515f756",
      target: "19e8e23f",
      label: "Workforce availability issues",
    },
    {
      id: "97d5e6d9",
      source: "9515f756",
      target: "a0197c6b",
      label: "Labor supply fluctuations",
    },
    {
      id: "32679a18",
      source: "19e8e23f",
      target: "9cb29287",
      label: "Loss of foreign investment",
    },
    {
      id: "afdff949",
      source: "19e8e23f",
      target: "8d962c96",
      label: "Fluctuations in global commodity prices",
    },
    {
      id: "fda29cde",
      source: "19e8e23f",
      target: "a28d00f7",
      label: "Increased demand for biofuels",
    },
    {
      id: "568be5fa",
      source: "a0197c6b",
      target: "352ab7fc",
      label: "Increased global demand",
    },
    {
      id: "44274dda",
      source: "a0197c6b",
      target: "92647e30",
      label: "Growing infrastructure needs",
    },
    {
      id: "4cdeb118",
      source: "a0197c6b",
      target: "25c80631",
      label: "Preservation of cultural heritage",
    },
    {
      id: "5c07be1c",
      source: "25c80631",
      target: "3f620224",
      label: "Indigenous cultural influence.",
    },
    {
      id: "2e97ecdc",
      source: "25c80631",
      target: "d1583ec2",
      label: "Indigenous land rights.",
    },
    {
      id: "f1af96ad",
      source: "25c80631",
      target: "a34291cc",
      label: "Indigenous environmental stewardship.",
    },
    {
      id: "e1f29057",
      source: "0508680f",
      target: "2938b106",
      label: "Increased demand for commercial spaces.",
    },
    {
      id: "e27a8fe7",
      source: "0508680f",
      target: "430a27b2",
      label: "Innovation in gadgets and technology.",
    },
    {
      id: "a4641597",
      source: "0508680f",
      target: "11011f3a",
      label: "Support for local and unique products.",
    },
    {
      id: "5812aefa",
      source: "2938b106",
      target: "a017cfd0",
      label: "Housing market fluctuations",
    },
    {
      id: "24fd2f4a",
      source: "2938b106",
      target: "d7affd5a",
      label: "Rental income uncertainty",
    },
    {
      id: "caa4818e",
      source: "2938b106",
      target: "3d495446",
      label: "Commission income decrease",
    },
    {
      id: "102a5907",
      source: "f59330ed",
      target: "5caec95c",
      label: "Pressure to reduce emissions",
    },
    {
      id: "9875e2d9",
      source: "f59330ed",
      target: "1400fba5",
      label: "Increased investment and support",
    },
    {
      id: "9b63e383",
      source: "f59330ed",
      target: "498daa78",
      label: "Improved environmental quality",
    },
    {
      id: "7d5de114",
      source: "5caec95c",
      target: "6a2479db",
      label: "Energy Cost Increases",
    },
    {
      id: "4e309ae1",
      source: "5caec95c",
      target: "870cdc3f",
      label: "Job Loss Risk",
    },
    {
      id: "fb739c8b",
      source: "5caec95c",
      target: "20809143",
      label: "Fuel Price Volatility",
    },
    {
      id: "c2c86792",
      source: "1400fba5",
      target: "2ea23e90",
      label: "Clean Energy Dependence",
    },
    {
      id: "a274e0d1",
      source: "1400fba5",
      target: "ac71a842",
      label: "Ocean Energy Solutions",
    },
    {
      id: "34f01497",
      source: "1400fba5",
      target: "11136b10",
      label: "Renewable Energy Solutions",
    },
    {
      id: "702db9eb",
      source: "2ea23e90",
      target: "1ede33a4",
      label: "Contaminated Water Sources",
    },
    {
      id: "0fa9f5cd",
      source: "2ea23e90",
      target: "365cde15",
      label: "Loss of Raw Materials",
    },
    {
      id: "91095452",
      source: "2ea23e90",
      target: "84a6806f",
      label: "Travel Restrictions due Pollution",
    },
    {
      id: "abebbe9f",
      source: "498daa78",
      target: "7519448f",
      label: "Community driven development",
    },
    {
      id: "a039553e",
      source: "498daa78",
      target: "5625b6fc",
      label: "Increased community engagement",
    },
    {
      id: "344dbdeb",
      source: "498daa78",
      target: "f2d2411f",
      label: "Affordable housing options",
    },
  ],
};

// Styled Components for better UI
const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(12, 12, 62);
  border-radius: 2px;
  overflow: hidden;
`;

const CustomNodeStyle = styled.div`
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const getLayoutedElements = (nodes, edges) => {
  if (nodes.length === 0) return { nodes, edges };

  // Create a hierarchy
  const hierarchy = stratify()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);

  // Find the root node
  const root = hierarchy(nodes);

  // Define the tree layout
  const layout = tree().nodeSize([200, 200]);

  // Position the nodes
  const layoutedNodes = layout(root)
    .descendants()
    .map((node) => ({
      ...node.data,
      position: { x: node.x, y: node.y },
    }));

  // Add style to edges
  const styledEdges = edges.map((edge) => ({
    ...edge,
    style: {
      stroke: "orange", // Change this to your desired color
      strokeWidth: 2,
    },
  }));

  return { nodes: layoutedNodes, edges: styledEdges };
};

// Custom Node Component
const CustomNode = ({ data }) => (
  <CustomNodeStyle>{data.label}</CustomNodeStyle>
);

const Graph = ({ data }) => {
  console.log(data);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (data) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(data.nodes, data.edges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [data]);

  return (
    <GraphContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ custom: CustomNode }}
      ></ReactFlow>
    </GraphContainer>
  );
};

export default Graph;
