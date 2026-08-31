---
title: '5: Indirect Functions'
---

Google operates a free service named "OSS-Fuzz", where developers of popular software can submit their code to be automatically tested on Google's servers. OSS-Fuzz constantly checks for bugs and exploits, reporting any that it finds to the project's maintainers. Since XZ Utils was so widely used, it was part of the OSS-Fuzz program.

Shortly after the release of 5.4.2, Jia requested Google to let him access the OSS-Fuzz reports. When Google contacted Lasse for confirmation, he approved. Since Jia was a maintainer now, he was allowed greater control over the project.

A week later, Lasse was contacted by Google again. Gabriela Gutierrez - a Google employee on their security team - had noticed XZ Utils didn't have a proper reporting procedure. If users found bugs in the software, it wasn't obvious how they should let maintainers know. Gabriela suggested an example procedure and Lasse gave it the green light. However, Jia had a few objections. He made a revised version that kept the intent similar, but reworded several paragraphs.

Version 5.4.3 was ready not too long after. It only contained a couple of fixes to the translations and some edge cases when compiling the software. The main highlight was Jia's new role. He was in charge of the release from start to finish. Whilst Lasse watched, Jia compiled the software according to the instructions. He finished by adding his digital signature to XZ Utils.

The transition wasn't entirely seamless: automated systems flagged the new digital signature, so some administrators had to manually approve the update. This update wasn't urgent, though. No one was going to lose any sleep over a couple translation fixes being delayed, after all.

---

Development picked up as June began. Three months after the project improved its security posture, a new developer called Hans Jansen appeared. He had prepared a pair of patches that would improve the performance of XZ Utils. They leveraged "indirect functions", commonly shortened to ifuncs. These ifuncs allow a program to rewire itself whenever it runs. Entire functions of code can be swapped with each other, according to the pre-programmed conditions. His patch optimised the *CRC64* function, which was used for checking if a file was corrupt. If the ifunc detected modern hardware, it would switch the *CRC64* function to a new, highly specialised version.

Lasse took a look and noticed Jia had already reviewed the patch. He had picked out the usual reasons a patch needed reworking: bad variable names, too many letters on a line of code, and unnecessary spaces. However, his opinion of the CRC patch was largely positive:

> "Overall, this seems like a nice improvement to our function picking strategy for CRC64. It will likely be useful when we implement CRC32 too :)"

*CRC32* is just a smaller version of *CRC64*, which is slightly less accurate but faster to compute. Hans' patch only changed the *CRC64* function, but it was simple enough that Jia could follow his footsteps to implement it for *CRC32* too.

Lasse wasn't quite as convinced as Jia. When he ran the automated tests on the patch, they returned errors. Looking closer, he noticed all of these errors were related to the optional *AddressSanitizer* memory checker. It was responsible for ensuring there were no unsafe modifications to memory. After researching, it turned out this was a well-known incompatibility. Ifuncs rewire the program before the *AddressSanitizer* is ready, resulting in a crash. The typical fix was to disable ifuncs when using the memory checker. He shrugged. It seemed an acceptable trade-off.

With compatibility solved and out of the way, his other concern was performance. He asked Hans for details about the patch.

> "How big a difference in speed does your patch make with your code? I would like to understand the real-world improvement that ifunc can make."

Hans replied to him quickly.

>  "I was noticing a 4-5% improvement. I'm also running all of this on older hardware, which may be contributing to the speedup."

While a 4-5% speed improvement isn't anything spectacular, it seemed like a nice bonus. He fired off a quick private message to Jia to gauge his opinion on the matter. When Jia reaffirmed that he was supportive of the addition, they thanked Hans for his contribution and added his code to XZ Utils.

---

After Hans' ifuncs were added to XZ Utils, Lasse and Jia received another email from Google's OSS-Fuzz service. It highlighted the new patch was causing constant crashes whenever the software was tested. They both read through the log trying to spot the issue, and it turned out to be as expected: OSS-Fuzz was utilising *AddressSanitizer*, not unlike their own tests had. The fix was simple: exempt ifuncs from Google's automated scans. Jia created a request for this, and within ten minutes, the change was in action.

This made Lasse uncomfortable. By disabling ifuncs in scans, any problems within the ifunc code wouldn't be easily identified ahead of time. Fortunately XZ Utils didn't use ifuncs in many places. He had read the documentation and knew how to spot the common pitfalls with them. The performance impact was also too good to pass up. It wasn't ideal, but he could sleep easily.

---

Work carried on as per usual. August marked Jia releasing version 5.4.4. It introduced web browser support to XZ Utils but did not support all features - only a subset of them. Regardless, it was a notable feat.

Hans returned to XZ Utils in September. His new patches once again focused on the *CRC* algorithms from earlier. The earlier contributions were for *CRC64*, and he had finally returned to improve *CRC32*. This time it even came with benchmarks, promising up to 70% faster performance. Again, the speed improvement came from using ifuncs. Lasse could hardly believe his eyes - you don't see improvements this good every day.

Hans kept iterating over his patch making small incremental improvements. After a few days of silence, Lasse finally responded.

> "I'm sorry for the delay. Neither Jia nor I have been able to look at this in the past few days :-( We are both happy to see an improved version of CRC32."

The code was genuinely solid. They all bounced ideas off each other for the next few days, until the final patch was as good as possible. He then approved and applied the patch to XZ Utils. Lasse saw this a few hours later and left a message.

> "We (or likely it's mostly Jia) will do a few tests later. Thanks again!"

---

Jia worked hard over the next week. He clearly wasn't satisfied with Hans' code - he made new files, rearranged old files, and rewrote comments explaining how it all worked.

Lasse was hard at work too. He implemented "sandboxing", where XZ Utils is cut off from the rest of the computer. Through this, he could mitigate the damage that a vulnerability in XZ Utils would have. Any damage caused by a bug in XZ Utils would be restricted to inside the sandbox.

Jia was inspired by Lasse's progress and also worked on the sandboxing. He fixed the automated tests by disabling sandboxing when using *AddressSanitizer*. He also continued adding sandboxing to more parts of XZ Utils, such as *xzdec* - the part dedicated to decompressing .xz files back to their original form.

---

A month later, Jia brought up the topic of the project's homepage. At the time, the XZ Utils was hosted on tukaani.org. Since its inception, it had just been another part of the Tukaani project. Jia thought it was more than that though: he wanted XZ Utils to have its own website and identity. Lasse was reluctant, but folded when Jia offered to handle the site creation himself. He designed the new website and even made a new logo to replace Bob the Toucan: simply the letters *XZ* in bright orange and yellow.

Minor releases continued to be prepared by Jia. Versions 5.4.5 and 5.4.6 both had very minimal changes. The major changes, such as the new work on sandboxing, were set to release in the next major version.
