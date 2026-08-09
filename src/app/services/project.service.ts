import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay, tap } from 'rxjs';
import { MoabiApiResponse } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private apiUrl = 'https://stag1.moabi2u.com/sales-api/project/public/v2/details/29';

  loading = signal<boolean>(true);

  // Embedded payload for testing reliability
  private fullPayload: MoabiApiResponse = {
    response: "SUCCESS",
    content: {
      projectName: "Elysia Heights",
      currency: "MYR",
      countryCode: "60",
      phoneNo: "361951258",
      tenure: "LEASEHOLD",
      propertyCategory: "SINGLE_STOREY_TERRACE_HOUSE",
      propertyType: ["RESIDENTIAL"],
      sizeUnit: "SQUARE_METRE",
      address1: "No. 1-197, Jalan 1-3",
      address2: "Taman Tasik Utama",
      address3: "",
      country: "Malaysia",
      state: "Melaka",
      city: "Ayer Keroh",
      postalCode: "75450",
      longitude: "102.27719486812285",
      latitude: "2.2793182321265353",
      descriptionTitle: "MTD Elysia Heights",
      descriptionSubTitle: "Single Storey Terrace",
      descriptionOverview: "Come home to a modern contemporary single-storey terrace house nestled amidst lush greenery just a stone away from the tranquil parks within a thriving township of Taman Tasik Utama, Ayer Keroh, Melaka",
      logo: "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/3ed614d9c6a14b2a8801b6448648e9b0.webp",
      sitePlan: "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/05858020b92c40459e813ff1c3c2b661.webp",
      video: "https://www.youtube.com/watch?v=1LyDhczU3NQ",
      landSize: 0.11,
      metricUnit: "HECTARE",
      bookingFees: 0,
      totalUnit: 237,
      totalUnitByBlock: [
        { name: "A", totalUnit: 197 },
        { name: "B", totalUnit: 40 }
      ],
      projectDetails: [
        { type: "PROJECT_DETAILS", name: "Taska", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/PROJECT_DETAILS/775065b214334e55a732ebf3965c1275.webp" },
        { type: "PROJECT_DETAILS", name: "Prayer Room", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/PROJECT_DETAILS/bfd9c6b0310c4954b196e6f8788658b5.webp" },
        { type: "PROJECT_DETAILS", name: "Playground", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/PROJECT_DETAILS/256b927ac6864dd9876450270d31c885.webp" },
        { type: "PROJECT_DETAILS", name: "Security", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/PROJECT_DETAILS/0307719be86348108cd03f004fba5542.webp" },
        { type: "PROJECT_DETAILS", name: "Swimming Pool", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/PROJECT_DETAILS/65b12d3e8d5b445ea8e19c1410ad5095.webp" }
      ],
      additionalFee: [
        { type: "ADDITIONAL_FEES", name: "Maintenance Fee", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/ADDITIONAL_FEES/8eb2eb8958ef493eb1ddcf768c6eca9c.webp" },
        { type: "ADDITIONAL_FEES", name: "Legal fees", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/ADDITIONAL_FEES/c82b6ab5efdf4f82a4ca0708c16eabd7.webp" },
        { type: "ADDITIONAL_FEES", name: "10% Deposit", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/ADDITIONAL_FEES/72627d1268d641fb925ba66523a53336.webp" }
      ],
      layouts: [
        {
          name: "Type A",
          buildUpArea: "1363",
          landArea: "1556",
          unit: null,
          desc: "",
          specification: null,
          url: ["https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/2e9d483e8e984e47badd99aae6c30fc2.webp"],
          totalUnit: 99,
          layoutData: {
            description: { type: "DESCRIPTION", value: ["4 Bedroom + 4 Bathroom"] },
            layoutSpecification: [
              { type: "UNIT_DETAILS", name: "Balcony", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/094a3c4119284a19906fc8701267e66c.webp" },
              { type: "UNIT_DETAILS", name: "Tennis Court", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/3431257349624e6db2a8b8936395638c.webp" },
              { type: "UNIT_DETAILS", name: "Free Aircond", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/e0ed3ca6ebb14392a2aac18d25b352cf.webp" },
              { type: "UNIT_DETAILS", name: "Free Cabinet", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/5ef52a3c5fd544ccb2f3c51f0c42adca.webp" }
            ],
            gallery: {
              type: "GALLERY",
              value: ["1686", "1687", "1688", "1689", "1690", "1711"],
              attachments: [
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/c4effc50f675473e993d3423f2c30642.webp", fileName: "gallery 1_terrace_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/36bd2b80a3fc4d1e876238d469de71ee.webp", fileName: "gallery 2_terrace_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/c67e9064c5044d8f9e5204ca5412635b.webp", fileName: "gallery 4_terrace_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/ccaa65b3c58d45d2a2402888e682e545.webp", fileName: "gallery 5_terrace_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/6da8db502655479dbb37e8544db1f115.webp", fileName: "gallery 6_terrace_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/5e64c4b3c137463eb89db03389c3fb3a.webp", fileName: "terrace-thumb-2.jpg" }
              ]
            },
            document: {
              type: "DOCUMENT",
              value: ["1691"],
              attachments: [{ value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/40cc11587b9741adb7e3c349ce5f09c8.pdf", fileName: "Type A Brochure" }]
            },
            interior: { type: "INTERIOR", value: ["https%3A%2F%2Fbeyond.3dnest.biz%2Fnewhouse%2F%3Fm%3D85945b2a_Bgcu_b6f9%26lang%3D1"] },
            exterior: { type: "EXTERIOR", value: ["https%3A%2F%2Fwww.virtual-tour.space%2Fpresint-pelangi-3-exterior%2Findex.html"] },
            floorPlan: {
              type: "FLOORPLAN",
              value: ["1693"],
              attachments: [{ value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/2e9d483e8e984e47badd99aae6c30fc2.webp", fileName: "Type A Floor Plan" }]
            }
          }
        },
        {
          name: "Type B",
          buildUpArea: "1345",
          landArea: "1550",
          unit: null,
          desc: "",
          specification: null,
          url: ["https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/64e8f26a7f9145c7af4a5f90008f885d.webp"],
          totalUnit: 98,
          layoutData: {
            description: { type: "DESCRIPTION", value: ["4 Bedroom + 3 Bathroom"] },
            layoutSpecification: [
              { type: "UNIT_DETAILS", name: "Balcony", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/094a3c4119284a19906fc8701267e66c.webp" },
              { type: "UNIT_DETAILS", name: "Basketball Court", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/d2b59ebb1ae04f2fad40a3b03d902105.webp" },
              { type: "UNIT_DETAILS", name: "Free Aircond", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/e0ed3ca6ebb14392a2aac18d25b352cf.webp" },
              { type: "UNIT_DETAILS", name: "Free Cabinet", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/5ef52a3c5fd544ccb2f3c51f0c42adca.webp" }
            ],
            gallery: {
              type: "GALLERY",
              value: ["1694", "1695", "1696", "1697", "1699"],
              attachments: [
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/a269d1e76bb14edba06465fa7a761e5d.webp", fileName: "gallery 1_semiD_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/5543650bead1472f96c2d044852ab71f.webp", fileName: "gallery 2_semiD_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/4fbea10e99784fdd8534ef733f67e4e5.webp", fileName: "gallery 3_semiD_typeA.png" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/666695ea86ee4ab6a4a4b86ce522c445.webp", fileName: "rathfarnham-jacqueline-murray-interiors" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/aa43ba4d8aa54eacad88977d22cff1ba.webp", fileName: "interior-thumb-typeB" }
              ]
            },
            document: {
              type: "DOCUMENT",
              value: ["1700"],
              attachments: [{ value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/db17573757a04636ac02d5fd96161cf2.pdf", fileName: "Type B Brochure" }]
            },
            interior: { type: "INTERIOR", value: ["https://my.matterport.com/show/?m=WsneGcA1aXm"] },
            exterior: { type: "EXTERIOR", value: ["https%3A%2F%2Fwww.virtual-tour.space%2Fpresint-pelangi-3-double-storey-terrace-exterior%2FPNG_Sequence.html"] },
            floorPlan: {
              type: "FLOORPLAN",
              value: ["1698"],
              attachments: [{ value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/64e8f26a7f9145c7af4a5f90008f885d.webp", fileName: "Type B Floor Plan" }]
            }
          }
        },
        {
          name: "Type C",
          buildUpArea: "1545",
          landArea: "1600",
          unit: null,
          desc: "",
          specification: null,
          url: ["https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/cc36ba34a056459ebc57b7141aaed209.webp"],
          totalUnit: 40,
          layoutData: {
            description: { type: "DESCRIPTION", value: ["5 Bedroom + 5 Bathroom"] },
            layoutSpecification: [
              { type: "UNIT_DETAILS", name: "Free Aircond", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/e0ed3ca6ebb14392a2aac18d25b352cf.webp" },
              { type: "UNIT_DETAILS", name: "Free Cabinet", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/5ef52a3c5fd544ccb2f3c51f0c42adca.webp" },
              { type: "UNIT_DETAILS", name: "SPC flooring", description: " ", imageUrl: "https://sales.moabi2u.com/sales1/UNIT_DETAILS/9a771a956e5c4548a7037e67453a3e97.webp" }
            ],
            gallery: {
              type: "GALLERY",
              value: ["1701", "1702", "1703", "1704", "1705", "1706"],
              attachments: [
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/8830e679482b4900b8598ef217cd925f.webp", fileName: "typecgallery1.jpg" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/37e7e49f67214ef688828e8ba32a36a4.webp", fileName: "typecgallery2.jpg" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/84aeb52de73c48d99a568fad50b3815e.webp", fileName: "typecgallery3.jpg" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/9a44d122804e47d69314085d3a786961.webp", fileName: "typecgallery4.jpg" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/775969e30aa640a4af3afddb2da69f38.webp", fileName: "typecgallery5.jpg" },
                { value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/9810239ed4764ff9a540a1e4ec4c4e5a.webp", fileName: "typecgallery6.jpg" }
              ]
            },
            document: {
              type: "DOCUMENT",
              value: ["1708"],
              attachments: [{ value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/b529c454b8164b99990838c39ec8a758.pdf", fileName: "Type C Brochure" }]
            },
            interior: { type: "INTERIOR", value: ["https%3A%2F%2Fmy.matterport.com%2Fshow%2F%3Fm%3D8qX56vHEoet%26brand%3D0"] },
            exterior: { type: "EXTERIOR", value: ["https://www.virtual-tour.space/presint-pelangi-3-exterior/index.html"] },
            floorPlan: {
              type: "FLOORPLAN",
              value: ["1707"],
              attachments: [{ value: "https://sales.moabi2u.com/sales1/UNIT_LAYOUT_OVERVIEW/cc36ba34a056459ebc57b7141aaed209.webp", fileName: "Type C Floor Plan" }]
            }
          }
        }
      ],
      documents: [
        { fileType: "DOCUMENT", value: "DS Terrace Brochure", tags: null, url: "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/45d8183a37e34f3c83b1d7c5c61261df.pdf" },
        { fileType: "DOCUMENT", value: "DS Semi-D Brochure", tags: null, url: "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/caf75584c5734e92a109584dccf035c9.pdf" },
        { fileType: "DOCUMENT", value: "SS Semi-D Brochure", tags: null, url: "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/efc93f8543a34d52b8ad7e59f1e3ea26.pdf" }
      ],
      map: [
        { fileType: "MAP", value: "Location Map", tags: null, url: "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/016e82b2a5b3408cab099ad9552c3a99.webp" }
      ],
      companyInfo: {
        name: "MTD PROPERTIES SDN. BHD.",
        registrationNo: "0718967A",
        newRegistrationNo: "200501036819",
        developerCode: "6525",
        address1: "L03-01, No. 1",
        address2: "Jalan Tun Mohd Fuad, Taman Tun Dr. Ismail",
        address3: "",
        country: "Malaysia",
        state: "Wilayah Persekutuan Kuala Lumpur",
        city: "Kuala Lumpur",
        postalCode: "60000",
        countryCode: "60",
        phoneNo: "361951258",
        email: "info@mtdproperties.com.my",
        others: ""
      },
      imageList: [
        "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/6858b5bf590b4ec3ab3273f10f721d0c.webp",
        "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/93d1a3ee7d86493ca687eb37ef2e9028.webp",
        "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/83b561deee004a73af0ef16b9858da12.webp",
        "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/2ab1a78266e044c8a6bfe3420a554f11.webp",
        "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/596b377265ba4471949b26b00b05cb16.webp",
        "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/4cc18b375e28415a83d26b966ee84304.webp",
        "https://sales.moabi2u.com/sales1/PROJECT_DOCUMENT/b87bc37b1431408c9686c36970f995cc.webp"
      ]
    }
  };

  getProjectData(): Observable<MoabiApiResponse> {
    this.loading.set(true);
    return this.http.get<MoabiApiResponse>(this.apiUrl).pipe(
      tap(() => this.loading.set(false)),
      catchError(() => {
        this.loading.set(false);
        return of(this.fullPayload);
      }),
      shareReplay(1)
    );
  }
}
