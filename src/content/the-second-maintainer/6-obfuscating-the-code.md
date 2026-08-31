---
title: 'Obfuscating the Code'
index: 6
---

Jia Tan had spent two and a half years working on XZ Utils with Lasse. Two and a half years building trust to become a maintainer. Two and a half years spent waiting. Two and a half years of volunteering as a maintainer from the goodness of his heart? No, his true intentions were to create a backdoor in the software - where he could fully control any computer he wished.

His first obstacle was users: despite there being so many users of XZ Utils, many were still using outdated versions. Jia needed them to update in order to compromise them. The best way to achieve this would be to create some much-wanted features, and he prepared a patch to do exactly that.

XZ Utils included specialist filters to compress code for certain CPU architectures better, such as *x64* and *ARM*. Jia created a filter for the architecture called *RISC-V*. This was a nicher architecture, but steadily growing in popularity. He knew people would update for it.

This feature was combined with sandboxing and released as version 5.5.1alpha. Users quickly responded - they loved the all the new features. Many stated they were excited for when these features would be stable instead of alpha. Jia had now laid the bait. It was time to add the backdoor.

---

Jia's goal wasn't merely to compromise XZ Utils. In his current position, he could do that easily. After this long of a wait, however, he wanted to hijack an even more significant piece of software: OpenSSH. 

OpenSSH is what lets administrators log in and manage servers from anywhere in the world. It lets companies rent out servers in vast data centres without needing to send somebody over with a keyboard. It was so useful, in fact, that it has near universal usage among the Fortune 500. Since it was installed on millions of company servers, Jia thought it was a prime target.

However, software as important as OpenSSH is always held under extreme scrutiny. Security researchers pore over every line of code, checking and double-checking for vulnerabilities and backdoors. People have tried and failed to break into OpenSSH - but those people were not Jia Tan.

To save themselves from reinventing the wheel, the developers of OpenSSH borrow plenty of code from other programmers. This is known as a "dependency", where OpenSSH needs another program's code in order to run. OpenSSH had a handful of dependencies, but Jia cared about one: Systemd.

On most Linux distros, Systemd is the glue that connects the operating system to the programs running on it. OpenSSH used it to manage notifications and alerts. Systemd is on par with the importance of OpenSSH, and is also heavily scrutinised. Unfortunately for them, it had a chink in its armour.

Systemd depended on XZ Utils. Accordingly, every time OpenSSH ran with Systemd, it also ran with XZ Utils. Nobody had noticed this weakness - nobody apart from Jia. Even better, he was now a maintainer and had full control over the project.

---

When Hans added ifuncs to the program, he took note. Jia created a backdoor hinging upon using ifuncs to swap functions. Despite the intention for ifuncs to rewire a program's own functions, Jia manipulated the ifuncs to replace code within OpenSSH.

Whilst OpenSSH contained many functions, he cared about one in particular. *RSA_public_decrypt* was responsible for verifying passwords when logging into computers. Jia added a special check so that, when he connected, OpenSSH would run any commands he provided. It gave full reign over any company's computer.

Using ifuncs gave Jia another advantage: most automated tests ran with ifuncs disabled. This meant his backdoor wouldn't be flagged in the tests, and would go undetected. Despite this safety, he still had to be cautious. One discovery could blow his entire cover, and reset years of work. He decided to hide the backdoor behind several layers of obfuscation. 

If XZ Utils recognised a researcher was inspecting it with a debugger, it wouldn't inject the backdoor. It would also be disabled if the program wasn't OpenSSH. 

Lastly, when XZ Utils was compiled to an executable, Jia made it check what distro it was on. He was targeting both Debian and Red Hat Linux - the two post popular distros for companies and governments.

He hid the backdoor and all these checks in plain sight. The XZ Utils automated tests included lots of .xz files that were decompressed to ensure that the software worked. He split the backdoor into two .xz files. The first seemed corrupted, but Jia knew the cipher to recover the compressed code. Likewise, the second decompressed to random letters and numbers, though could be decrypted to the other half of the backdoor. Splitting the backdoor in two prevented any single file seeming suspicious.

Back in 2008, Lasse had added a note to the folder containing the test files.

> Many of the files have been created by hand. There is no better "source code" than the files themselves.

Thanks to this, Jia now had an excuse to add his archives without anybody inspecting closely. The very next day, he released version 5.6.0 infected with the backdoor. All he had to do now was wait for people to update.

---

Just an hour after the update, a Linux distro named Gentoo made a bug report. He panicked. How had they found the backdoor so soon? When he checked the report, he let out a sigh of relief. This version was the first to include Hans' optimisations, and Gentoo wasn't fully compatible with how they were used. Jia quickly wrote a reply explaining the bug to Gentoo and fixed the problem.

Two days passed, and the Debian distro added version 5.6.0 to their unstable packages. Anybody running unstable Debian would update and be backdoored. Jia sent a few emails to Richard Jones, a packager for the Fedora distro. Fedora's main packager for XZ Utils was often busy, so he had stepped up. Jia asked him to update the version used in Fedora, and Richard happily obliged. Fedora's testing version was now also backdoored.

Jia decided to take precautions to prevent another Gentoo incident. In what seemed like a routine update, he added a subtle typo to the sandboxing code so it would no longer run. The backdoor already bypassed Lasse's sandboxing, but it didn't hurt to be careful. 

---

A few days later, Red Hat also created a bug report. They were testing the program with the debugging tool *Valgrind*, and noticed a variety of memory errors - all caused by the backdoor's ifuncs. It seemed the Gentoo patch hadn't fixed all of Jia's problems. Since Red Hat Linux was one of his main targets, this was potentially disastrous. He modified the backdoored test files to fix the bug, and invented an excuse to explain his why the test files changed.

> The original files were generated with random local to my machine. To better reproduce these files in the future, a constant seed was used to recreate these files.

It was a lie, but a plausible one. As a distraction, he also modified Hans' ifunc code. Red Hat fell for it and didn't realise the problem was fixed because of the new test files. They stopped investigating the software too closely. He then released version 5.6.1, containing all the previously mentioned fixes.

Meanwhile, a patch was prepared that threatened to ruin his entire plan. A developer tweaked Systemd so it no longer depended on XZ Utils. This broke the dependency chain from OpenSSH to Systemd to XZ Utils, foiling Jia's entire plan. It was a race against time to update XZ Utils before Systemd could.

---

The next two weeks dragged on for Jia as he waited for the new version to spread. It was already in prereleases for both the Debian and Red Hat distros. He had to wait just a little longer though, as he needed the versions in the regular releases of these distros. As soon as that happened, he would be able to activate the backdoor.

On the 25th March, whilst he waited for it to spread, he simplified the instructions for security researchers interested in XZ Utils. To prevent anyone discovering the backdoor, he asked researchers to report issues privately and without need for elaborate description. He hoped that it would guide people to examine the software less closely.

Lasse was none the wiser about Jia's true intentions. He kept creating new patches for XZ Utils, entirely unaware that a backdoor lay dormant within his project.

Two days later, Debian unstable updated to 5.6.1, and the next day Jia requested the Ubuntu distro to update to 5.6.1. XZ Utils's backdoor was just about to hit Debian's and Red Hat's stable releases, and Jia could hardly wait. 