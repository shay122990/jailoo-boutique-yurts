import { supabase } from "../_lib/supabase.js";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { yurts } from "../data/yurts.js";
import { experiences } from "../data/experiences.js";

const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

async function uploadImages({
  items,
  table,
  bucket,
  matchColumn,
  getFilename,
}) {
  for (const [index, item] of items.entries()) {
    const filename = getFilename(item, index);

    const localPath = path.join(
      process.cwd(),
      "public",
      table === "yurts" ? "yurts" : "experiences",
      filename,
    );

    console.log(`Reading: ${localPath}`);

    const extension = path.extname(filename).toLowerCase();
    const contentType = contentTypes[extension];

    if (!contentType) {
      console.error(`Unsupported image type: ${filename}`);
      continue;
    }

    let buffer;

    try {
      buffer = await readFile(localPath);
    } catch (error) {
      console.error(`Cannot read ${localPath}:`, error.message);
      continue;
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error(`Upload failed for ${filename}:`, uploadError.message);
      continue;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);

    const { data: updated, error: updateError } = await supabase
      .from(table)
      .update({ image: data.publicUrl })
      .eq(matchColumn, item[matchColumn])
      .select(matchColumn);

    if (updateError) {
      console.error(
        `Database update failed for ${filename}:`,
        updateError.message,
      );
      continue;
    }

    if (!updated?.length) {
      console.warn(`No matching row for ${item[matchColumn]} in ${table}`);
      continue;
    }

    console.log(`Successfully uploaded ${table}: ${filename}`);
  }
}

async function main() {
  console.log("Uploading yurt images...");

  await uploadImages({
    items: yurts,
    table: "yurts",
    bucket: "yurts",
    matchColumn: "slug",
    getFilename: (yurt, index) => `${index + 1}.png`,
  });

  console.log("Uploading experience images...");

  await uploadImages({
    items: experiences,
    table: "experiences",
    bucket: "experiences",
    matchColumn: "id",
    getFilename: (experience) => path.basename(experience.image),
  });

  console.log("Image upload process finished.");
}

main().catch((error) => {
  console.error("Upload process failed:", error);
  process.exitCode = 1;
});

// SQL editor add
// CREATE POLICY "Allow reading Jailoo storage objects"
// ON storage.objects
// FOR SELECT
// TO anon
// USING (bucket_id IN ('yurts', 'experiences'));

// CREATE POLICY "Allow updating Jailoo storage objects"
// ON storage.objects
// FOR UPDATE
// TO anon
// USING (bucket_id IN ('yurts', 'experiences'))
// WITH CHECK (bucket_id IN ('yurts', 'experiences'));

// RUN find src -iname '*supabase*' -o -path '*/data/yurts.js' -o -path '*/data/experiences.js'
