import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// console.log("check : ")

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method !== 'POST') {
        res.status(405).json({message : "Method not allowed for File Upload"});
    }
    // console.log("yes")
    try {
        const data: { files: any } = await new Promise((resolve, reject) => {
            // console.log("yes")
            const form = new IncomingForm({maxFiles : 1});
            form.parse(req, async (err: any, fields: any, files: any) => {
                if (err) return res.status(500).json({
                    message : "file parsing error",
                    error : err.message
                });
                let file = files.pdf;
                console.log("FILES:", files);

                // console.log("yesbruh1")
            
                if (!file) {
                    return res.status(400).json({ message: 'PDF file missing or invalid' });
                }

                if (Array.isArray(file)) {
                    file = file[0];
                }

                // console.log("yesbruh2")
    
                const buffer = await fs.readFile(file.filepath);
                const fileName = `${Date.now()}_${file.originalFilename}`;
    
                const { error } = await supabase.storage
                                                .from('pdf-notes')
                                                .upload(fileName, buffer, {
                                                    contentType: 'application/pdf',
                                                });

                console.log("error : " , error);
                                                
                if(error){
                    return res.status(500).json({
                        message : "file upload error",
                        error : error.message
                    })
                }

                // console.log("yes;ast")

                const {data: urlData} = supabase.storage.from('pdf-notes').getPublicUrl(fileName);
                return res.status(200).json({ 
                    message: 'Upload successful', 
                    publicUrl: urlData.publicUrl ,
                    pdfname : file.originalFilename
                });
            });
        });
    } catch (error: any) {
        res.status(500).json(error.message);
    }
};
